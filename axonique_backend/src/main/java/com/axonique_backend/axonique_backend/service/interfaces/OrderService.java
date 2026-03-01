package com.axonique_backend.axonique_backend.service.interfaces;

import java.util.List;
import com.axonique_backend.axonique_backend.dto.request.PlaceOrderRequest;
import com.axonique_backend.axonique_backend.model.OrderStatus;
import com.axonique_backend.axonique_backend.dto.response.OrderResponse;

/**
 * OrderService — interface defining the order feature contract.
 *
 * SOLID I: separated from ProductService — no coupling between features.
 * SOLID D: controllers depend on this interface, not the implementation.
 */
public interface OrderService {

    OrderResponse placeOrder(PlaceOrderRequest request);

    OrderResponse getOrderById(Long id);

    List<OrderResponse> getOrdersByEmail(String email);

    List<OrderResponse> getAllOrders();

    OrderResponse updateOrderStatus(Long id, OrderStatus newStatus);
}
