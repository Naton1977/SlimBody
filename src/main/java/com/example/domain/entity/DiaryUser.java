package com.example.domain.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user")
public class DiaryUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "user_login", unique = true)
    private String userLogin;

    @Column(name = "user_password")
    private String userPassword;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_role")
    private String role;

    @Column(name = "user_dayly_calorie_content", columnDefinition = "Float(10,2) default 0.0")
    private double calorieContent;

    @ManyToMany
    @JoinTable(name = "user_product",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private Set<Product> productSet = new HashSet<>();


    @ManyToMany
    @JoinTable(name = "user_daily_dietary_ration",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "recording_id"))
    private Set<DailyDietaryRation> dailyDietaryRations = new HashSet<>();


    @ManyToMany
    @JoinTable(name = "user_body_parameters",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "body_parameter_id"))
    private Set<BodyParameters> bodyParametersSet = new HashSet<>();


    @ManyToMany
    @JoinTable(name = "user_recipe",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id"))
    private Set<Recipe> recipeSet = new HashSet<>();


    public DiaryUser() {

    }

    public Set<Recipe> getRecipeSet() {
        return recipeSet;
    }

    public void setRecipeSet(Set<Recipe> recipeSet) {
        this.recipeSet = recipeSet;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Set<Product> getProductSet() {
        return productSet;
    }

    public void setProductSet(Set<Product> productSet) {
        this.productSet = productSet;
    }

    public Set<DailyDietaryRation> getDailyDietaryRations() {
        return dailyDietaryRations;
    }

    public void setDailyDietaryRations(Set<DailyDietaryRation> dailyDietaryRations) {
        this.dailyDietaryRations = dailyDietaryRations;
    }

    public Set<BodyParameters> getBodyParametersSet() {
        return bodyParametersSet;
    }

    public void setBodyParametersSet(Set<BodyParameters> bodyParametersSet) {
        this.bodyParametersSet = bodyParametersSet;
    }

    public double getCalorieContent() {
        return calorieContent;
    }

    public void setCalorieContent(double calorieContent) {
        this.calorieContent = calorieContent;
    }

    public void addProductSet(Product product) {
        productSet.add(product);
    }


    public void addDailyDietaryRations(DailyDietaryRation dailyDietaryRation) {
        dailyDietaryRations.add(dailyDietaryRation);
    }

    public void addRecipeSet(Recipe recipe) {
        recipeSet.add(recipe);
    }

    public void addBodyParameters(BodyParameters bodyParameters) {
        bodyParametersSet.add(bodyParameters);
    }

    @Override
    public String toString() {
        return "DiaryUser{" +
                "userId=" + userId +
                ", userLogin='" + userLogin + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", role='" + role + '\'' +
                ", calorieContent=" + calorieContent +
                '}';
    }
}
