package com.example.service;

import com.example.domain.entity.DiaryUser;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final ProductService productService;

    public CustomUserDetailsService(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public UserDetails loadUserByUsername(String userLogin) throws UsernameNotFoundException {
        Optional<DiaryUser> diaryUserOptional = Optional.ofNullable(productService.findUserByLogin(userLogin));
        if(diaryUserOptional.isEmpty()) throw new UsernameNotFoundException("Not found by " + userLogin);
        DiaryUser diaryUser = diaryUserOptional.get();
        return new User(diaryUser.getUserLogin(), diaryUser.getUserPassword(),
                AuthorityUtils.createAuthorityList(diaryUser.getRole()));
    }

}

