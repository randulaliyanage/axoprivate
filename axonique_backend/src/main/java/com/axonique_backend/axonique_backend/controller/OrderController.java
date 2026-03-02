package com.axonique_backend.axonique_backend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.axonique_backend.axonique_backend.dto.request.PlaceOrderRequest;
import com.axonique_backend.axonique_backend.dto.response.ApiResponse;
import com.axonique_backend.axonique_backend.dto.response.OrderResponse;
import com.axonique_backend.axonique_backend.model.OrderStatus;
import com.axonique_backend.axonique_backend.service.interfaces.OrderService;


/**
 * REST controller for placing and managing orders.
 *
 * Maps to SCRUM-18 (Shopping Cart / Checkout).
 *
 * SOLID S: handles HTTP concerns only; all logic in OrderService.
 * SOLID D: depends on OrderService interface.
 *
 * Base URL: /api/orders
 */
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    /**
     * POST /api/orders
     * Place a new order from the cart.
     *
     * Maps to: SCRUM-18 — Checkout button in CartPage
     */
    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> placeOrder(
            @Valid @RequestBody PlaceOrderRequest request) {
        OrderResponse order = orderService.placeOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.created(order));
    }

    /**
     * GET /api/orders/{id}
     * Retrieve a single order by its ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrder(@PathVariable Long id) {
        OrderResponse order = orderService.getOrderById(id);
        return ResponseEntity.ok(ApiResponse.ok("Order retrieved", order));
    }

    /**
     * GET /api/orders?email=customer@example.com
     * Retrieve all orders for a customer.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getOrders(
            @RequestParam(required = false) String email) {
        List<OrderResponse> orders = email != null
                ? orderService.getOrdersByEmail(email)
                : orderService.getAllOrders();
        return ResponseEntity.ok(ApiResponse.ok("Orders retrieved", orders));
    }

    /**
     * PATCH /api/orders/{id}/status
     * Admin: update the status of an order.
     * Body: { "status": "SHIPPED" }
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<OrderResponse>> updateStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status) {
        OrderResponse updated = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(ApiResponse.ok("Order status updated", updated));
    }
}