package com.axonique_backend.axonique_backend.config;

import com.axonique_backend.axonique_backend.model.Role;
import com.axonique_backend.axonique_backend.model.User;
import com.axonique_backend.axonique_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create Admin if not exists
        if (!userRepository.existsByUsername("admin")) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@axonique.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .enabled(true)
                    .build();
            userRepository.save(admin);
        }

        // Create Staff if not exists
        if (!userRepository.existsByUsername("staff_1")) {
            User staff = User.builder()
                    .username("staff_1")
                    .email("staff1@axonique.com")
                    .password(passwordEncoder.encode("staff12345678"))
                    .role(Role.STAFF)
                    .enabled(true)
                    .build();
            userRepository.save(staff);
        }
    }
}
