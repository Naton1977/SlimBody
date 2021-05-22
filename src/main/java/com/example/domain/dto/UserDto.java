package com.example.domain.dto;

import com.example.validator.Login;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

public class UserDto {
    private int userId;

    @Length(min = 5, message = "{user.login.min.length}")
    @Login(message = "{user.login}")
    @NotEmpty(message = "{user.login.notEmpty}")
    private String userLogin;


    @Length(min = 5, message = "{user.password.min.length}")
    @NotEmpty(message = "{user.passwordNotEmpty}")
    private String userPassword;


    @Email(message = "{user.email.bad.format}")
    @NotEmpty(message = "{user.email.notEmpty}")
    private String userEmail;

    @NotEmpty(message = "{user.confirmPasswordNotEmpty}")
    private String confirmPassword;

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public UserDto() {

    }

    public UserDto(int userId, String userLogin, String userPassword, String userEmail, String confirmPassword) {
        this.userId = userId;
        this.userLogin = userLogin;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
        this.confirmPassword = confirmPassword;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "userId=" + userId +
                ", userLogin='" + userLogin + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", confirmPassword='" + confirmPassword + '\'' +
                '}';
    }
}
