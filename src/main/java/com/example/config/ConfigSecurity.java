package com.example.config;

import com.example.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Configuration
@EnableWebSecurity
public class ConfigSecurity extends WebSecurityConfigurerAdapter {

    @Autowired
    public CustomUserDetailsService customUserDetailsService;


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.authorizeRequests().antMatchers("/diaryPage").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");

        http.authorizeRequests().antMatchers("/bodyParameters/**").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");

        http.authorizeRequests().antMatchers("/api/v1/product/**").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");

        http.authorizeRequests().antMatchers("/**", "/login", "/logout").permitAll();

        http.formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/diaryPage")
                .failureUrl("/login?error=true")
                .usernameParameter("login")
                .passwordParameter("password")
                .and().logout().logoutSuccessUrl("/login?logout=success");

    }


}
