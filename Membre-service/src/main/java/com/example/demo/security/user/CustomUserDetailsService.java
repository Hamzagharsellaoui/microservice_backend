package com.example.demo.security.user;

import com.example.demo.entity.Membre;
import com.example.demo.repository.MembreRepository;
import jakarta.persistence.DiscriminatorValue;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MembreRepository membreRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Membre m = membreRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new UsernameNotFoundException("No user with email: " + email));

        String type = m.getClass().getAnnotation(DiscriminatorValue.class).value();

        List<GrantedAuthority> auth = new ArrayList<>();
        if ("admin".equals(type)) auth.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        else {
            auth.add(new SimpleGrantedAuthority("ROLE_MEMBER"));
            if ("ens".equals(type)) auth.add(new SimpleGrantedAuthority("ROLE_ENS"));
            if ("etd".equals(type)) auth.add(new SimpleGrantedAuthority("ROLE_ETD"));
        }

        return new org.springframework.security.core.userdetails.User(
                m.getEmail(),
                m.getPassword(),
                auth
        );
    }
}
