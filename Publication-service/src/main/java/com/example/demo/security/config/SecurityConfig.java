package com.example.demo.security.config;

import com.example.demo.security.jwt.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // VISITEUR (public)
                        .requestMatchers(HttpMethod.GET, "/publications/**").permitAll()

                        // MEMBER + ADMIN (create/update own content)
                        .requestMatchers(HttpMethod.POST, "/publications/**").hasAnyRole("ADMIN", "MEMBER")
                        .requestMatchers(HttpMethod.PUT, "/publications/**").hasAnyRole("ADMIN", "MEMBER")

                        // ADMIN (delete global)
                        .requestMatchers(HttpMethod.DELETE, "/publications/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
