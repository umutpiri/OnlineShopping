package com.humbo.humbo2;

import com.humbo.humbo2.domain.CustomUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private SpringDataJpaUserDetailsService userDetailsService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
			.userDetailsService(this.userDetailsService)
				.passwordEncoder(CustomUser.PASSWORD_ENCODER);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.csrf().disable()
			.authorizeRequests()
				.antMatchers("/", "/**/*", "/api/**/*", "/**/*.{js,html,css}").permitAll()
				.antMatchers("/api/s/**/*").hasRole("SELLER")
				.antMatchers("api/c/**/*").hasRole("CUSTOMER")
				.antMatchers("/api/address", "/api/address/**/*").hasAnyRole(new String[]{"SELLER", "CUSTOMER"})
				.anyRequest().authenticated()
				.and()
			// .formLogin()
			// 	.defaultSuccessUrl("/", true)
			// 	.permitAll()
			// 	.and()
			.httpBasic();
			// 	.and()
			// .logout()
			// 	.logoutSuccessUrl("/");
	}

}