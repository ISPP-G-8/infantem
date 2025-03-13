package com.isppG8.infantem.infantem.auth;

import java.util.ArrayList;

import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import com.isppG8.infantem.infantem.user.UserService;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.auth.payload.request.SignupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

	private final PasswordEncoder encoder;
	private final AuthoritiesService authoritiesService;
	private final UserService userService;

	@Autowired
	public AuthService(@Nullable PasswordEncoder encoder, AuthoritiesService authoritiesService,
			UserService userService) {
		if (encoder != null) {
			this.encoder = encoder;
		} else {
			this.encoder = new BCryptPasswordEncoder();
		}
		this.authoritiesService = authoritiesService;
		this.userService = userService;
	}

	@Transactional
	public void createUser(@Valid SignupRequest request) {
		User user = new User();
		user.setUsername(request.getUsername());
		user.setPassword(encoder.encode(request.getPassword()));
		user.setName(request.getName());
		user.setSurname(request.getSurname());
		user.setUsername(request.getUsername());
		user.setEmail(request.getEmail());
		Authorities authority = authoritiesService.findByAuthority("user");
		user.setAuthorities(authority);
		userService.save(user);

	}
}
