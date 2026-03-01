package com.axonique_backend.axonique_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

/**
 * dev-friendly security setup.
 *
 * Permits all API requests without authentication and disables CSRF
 * (stateless REST API). Spring Security still runs but no longer
 * blocks requests with a 401, which was preventing the frontend from
 * reaching the product endpoints.
 *
 * SOLID S: security policy lives here, separate from CORS and business logic.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF — not needed for a stateless REST API
                .csrf(AbstractHttpConfigurer::disable)
                // Allow all requests without authentication
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                // Let the CorsFilter bean (CorsConfig) handle CORS
                .cors(cors -> {
                });

        return http.build();
    }
}
