package com.example.demo.security.auth;

import com.example.demo.entity.Membre;
import com.example.demo.repository.MembreRepository;
import com.example.demo.security.auth.dto.LoginRequest;
import com.example.demo.security.auth.dto.LoginResponse;
import com.example.demo.security.jwt.JwtService;
import jakarta.persistence.DiscriminatorValue;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authManager;
    private final MembreRepository membreRepository;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email(), req.password())
        );

        Membre m = membreRepository.findByEmail(req.email()).orElseThrow();
        String type = m.getClass().getAnnotation(DiscriminatorValue.class).value(); // admin/ens/etd

        List<String> roles = new ArrayList<>();
        if ("admin".equals(type)) roles.add("ROLE_ADMIN");
        else {
            roles.add("ROLE_MEMBER");
            if ("ens".equals(type)) roles.add("ROLE_ENS");
            if ("etd".equals(type)) roles.add("ROLE_ETD");
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", roles);
        claims.put("id", m.getId());
        claims.put("type", type);

        String token = jwtService.generateToken(m.getEmail(), claims);
        return new LoginResponse(token, type);
    }
}