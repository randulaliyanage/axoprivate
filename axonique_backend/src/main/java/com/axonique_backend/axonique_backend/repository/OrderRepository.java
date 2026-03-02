package com.axonique_backend.axonique_backend.repository;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.axonique_backend.axonique_backend.model.Order;
import com.axonique_backend.axonique_backend.model.OrderStatus;

/**
 * data access layer for Orders.
 *
 * SOLID D: services depend on this abstraction, not a concrete DAO.
 * SOLID S: only handles order persistence queries.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCustomerEmail(String email);

    List<Order> findByStatus(OrderStatus status);

    List<Order> findByCustomerEmailOrderByCreatedAtDesc(String email);
}
