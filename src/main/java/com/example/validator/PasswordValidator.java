package com.example.validator;

import com.example.domain.dto.UserDto;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class PasswordValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return (UserDto.class.equals(aClass));
    }

    @Override
    public void validate(Object o, Errors errors) {
        UserDto userDto = (UserDto) o;
        if (!userDto.getUserPassword().equals(userDto.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "doNotMatch");
        }

    }
}
