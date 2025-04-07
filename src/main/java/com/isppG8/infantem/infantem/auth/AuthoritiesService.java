package com.isppG8.infantem.infantem.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.user.User;

@Service
public class AuthoritiesService {

    private AuthoritiesRepository authoritiesRepository;

    private UserService userService;

    @Autowired
    public AuthoritiesService(AuthoritiesRepository authoritiesRepository, UserService userService) {
        this.authoritiesRepository = authoritiesRepository;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public Authorities findByAuthority(String authority) {
        return authoritiesRepository.findByAuthority(authority)
                .orElseThrow(() -> new RuntimeException("Authority does not exist"));
    }

    public boolean isAdmin() {

        User user = userService.findCurrentUser();

        Authorities authorities = user.getAuthorities();
        Authorities adminAuth = authoritiesRepository.findByAuthority("admin").orElse(null);

        if (authorities.equals(adminAuth)) {
            return true;
        }
        return false;
    }
}
