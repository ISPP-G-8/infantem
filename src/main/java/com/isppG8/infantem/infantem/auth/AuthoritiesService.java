package com.isppG8.infantem.infantem.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;

import com.isppG8.infantem.infantem.user.User;

@Service
public class AuthoritiesService {

    private AuthoritiesRepository authoritiesRepository;

    @Autowired
    public AuthoritiesService(AuthoritiesRepository authoritiesRepository) {
        this.authoritiesRepository = authoritiesRepository;
    }

    @Transactional(readOnly = true)
    public Authorities findByAuthority(String authority) {
        return authoritiesRepository.findByAuthority(authority)
                .orElseThrow(() -> new RuntimeException("Authority does not exist"));
    }

    @Transactional(readOnly = true)
    public User findCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null)
            throw new ResourceNotFoundException("Nobody authenticated!");
        else
            return authoritiesRepository.findByUsername(auth.getName());
    }

    public boolean isAdmin() {

        // Not pretty, but circular dependency otherwise, sorry
        User user = this.findCurrentUser();

        Authorities authorities = user.getAuthorities();
        Authorities adminAuth = authoritiesRepository.findByAuthority("admin").orElse(null);

        return authorities.equals(adminAuth);
    }
}
