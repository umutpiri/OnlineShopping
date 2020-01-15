
package com.humbo.humbo2;

import com.humbo.humbo2.domain.CustomUser;
import com.humbo.humbo2.repository.CustomUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService {

	private final CustomUserRepository repository;

	@Autowired
	public SpringDataJpaUserDetailsService(CustomUserRepository repository) {
		this.repository = repository;
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		CustomUser user = this.repository.findByEmail(email).get();
		return new User(user.getEmail(), user.getPassword(),
				AuthorityUtils.createAuthorityList(user.getRoles()));
	}

}