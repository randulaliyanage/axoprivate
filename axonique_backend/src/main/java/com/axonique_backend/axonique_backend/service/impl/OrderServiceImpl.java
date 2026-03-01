package com.axonique_backend.axonique_backend.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.axonique_backend.axonique_backend.dto.request.CartItemRequest;
import com.axonique_backend.axonique_backend.dto.request.PlaceOrderRequest;
import com.axonique_backend.axonique_backend.dto.response.OrderResponse;
import com.axonique_backend.axonique_backend.exception.BusinessException;
import com.axonique_backend.axonique_backend.exception.ResourceNotFoundException;
import com.axonique_backend.axonique_backend.mapper.OrderMapper;
import com.axonique_backend.axonique_backend.model.Order;
import com.axonique_backend.axonique_backend.model.OrderItem;
import com.axonique_backend.axonique_backend.model.OrderStatus;
import com.axonique_backend.axonique_backend.model.Product;
import com.axonique_backend.axonique_backend.repository.OrderRepository;
import com.axonique_backend.axonique_backend.repository.ProductRepository;
import com.axonique_backend.axonique_backend.service.interfaces.OrderService;
import com.axonique_backend.axonique_backend.service.interfaces.ShippingCalculator;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

/**
 * OrderServiceImpl — concrete implementation of OrderService.
 *
 * SOLID S: handles order business logic only; shipping fee delegated
 *   to ShippingCalculator.
 * SOLID D: depends on interfaces (OrderService, ProductRepository)
 *   not concrete classes.
 * SOLID L: substitutable for OrderService in any context.
 *
 * OOP:
 *  - Encapsulation: complex order-building logic is in a private method.
 *  - Composition: builds Order by composing OrderItems using OrderItem.from().
 */
@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository      orderRepository;
    private final ProductRepository    productRepository;
    private final ShippingCalculator   shippingCalculator;
    private final OrderMapper          orderMapper;

    @Override
    public OrderResponse placeOrder(PlaceOrderRequest request) {
        // 1. Build order items + compute subtotal
        Order order = buildOrder(request);

        // 2. Persist
        Order saved = orderRepository.save(order);
        return orderMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long id) {
        return orderMapper.toResponse(findOrderOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByEmail(String email) {
        return orderRepository.findByCustomerEmailOrderByCreatedAtDesc(email)
                .stream()
                .map(orderMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(orderMapper::toResponse)
                .toList();
    }

    @Override
    public OrderResponse updateOrderStatus(Long id, OrderStatus newStatus) {
        Order order = findOrderOrThrow(id);
        validateStatusTransition(order.getStatus(), newStatus);
        order.setStatus(newStatus);
        return orderMapper.toResponse(orderRepository.save(order));
    }

    // ===== Private helpers =====

    /**
     * OOP Encapsulation: full order construction logic is hidden here.
     * Each CartItemRequest is resolved to a product, validated, and
     * assembled into an OrderItem.
     */
    private Order buildOrder(PlaceOrderRequest request) {
        BigDecimal subtotal = BigDecimal.ZERO;

        Order order = Order.builder()
                .customerName(request.getCustomerName())
                .customerEmail(request.getCustomerEmail())
                .deliveryAddress(request.getDeliveryAddress())
                .subtotal(BigDecimal.ZERO)  // updated below
                .shippingFee(BigDecimal.ZERO)
                .total(BigDecimal.ZERO)
                .build();

        for (CartItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", itemReq.getProductId()));

            if (!product.isInStock()) {
                throw new BusinessException(
                        "Product '" + product.getName() + "' is currently out of stock");
            }

            if (!product.getSizes().contains(itemReq.getSize())) {
                throw new BusinessException(
                        "Size '" + itemReq.getSize() + "' is not available for '" + product.getName() + "'");
            }

            // OOP: factory method on OrderItem encapsulates snapshot creation
            OrderItem item = OrderItem.from(product, itemReq.getSize(), itemReq.getQuantity());
            order.addItem(item);  // maintains bi-directional relationship
            subtotal = subtotal.add(item.getLineTotal());
        }

        BigDecimal shippingFee = shippingCalculator.calculate(subtotal);
        order.setSubtotal(subtotal);
        order.setShippingFee(shippingFee);
        order.setTotal(subtotal.add(shippingFee));

        return order;
    }

    /**
     * SOLID S: status transition validation is its own isolated concern.
     * SOLID O: add new status transitions here without changing the calling method.
     */
    private void validateStatusTransition(OrderStatus current, OrderStatus next) {
        if (current == OrderStatus.DELIVERED || current == OrderStatus.CANCELLED) {
            throw new BusinessException(
                    "Cannot update status of a " + current.name().toLowerCase() + " order");
        }
        if (next == OrderStatus.PENDING) {
            throw new BusinessException("Cannot revert an order back to PENDING");
        }
    }

    private Order findOrderOrThrow(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", id));
    }
}