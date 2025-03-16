package com.isppG8.infantem.infantem.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}

