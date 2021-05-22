package com.example.validator;

import com.example.domain.entity.DiaryUser;
import com.example.repository.UserRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;

public class LoginValidation implements ConstraintValidator<Login, String> {

    private final UserRepository userRepository;

    public LoginValidation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public void initialize(Login login) {

    }

    @Override
    public boolean isValid(String login, ConstraintValidatorContext constraintValidatorContext) {
        List<DiaryUser> userList = userRepository.findAll();

        for (int i = 0; i < userList.size(); i++) {
            if (userList.get(i).getUserLogin().equals(login)) {
                return false;
            }
        }
        return true;
    }
}
