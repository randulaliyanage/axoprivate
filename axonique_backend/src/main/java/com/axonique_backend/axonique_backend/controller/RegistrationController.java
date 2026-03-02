package com.axonique_backend.axonique_backend.controller;

import com.axonique_backend.axonique_backend.dto.RegistrationDto;
import com.axonique_backend.axonique_backend.service.RegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.axonique_backend.axonique_backend.dto.LoginDto;
import com.axonique_backend.axonique_backend.model.User;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // For development convenience
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegistrationDto registrationDto) {
        try {
            registrationService.registerUser(registrationDto);
            return ResponseEntity.ok("User registered successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("An error occurred during registration: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto) {
        try {
            User user = registrationService.loginUser(loginDto.getUsername(), loginDto.getPassword());
            return ResponseEntity.ok("Login successful! Welcome " + user.getUsername());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("An error occurred during login: " + e.getMessage());
        }
    }
}
