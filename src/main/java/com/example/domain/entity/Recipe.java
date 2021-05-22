package com.example.domain.entity;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "recipe")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id")
    private int recipeId;

    @Column(name = "recipe_name")
    private String recipeName;

    @Column(name = "proteins", columnDefinition = "Float(5,2)")
    private double proteins;

    @Column(name = "fats", columnDefinition = "Float(5,2)")
    private double fats;

    @Column(name = "carbohydrates", columnDefinition = "Float(5,2)")
    private double carbohydrates;

    @Column(name = "calorie_content", columnDefinition = "Float(6,2)")
    private double calorieContent;


    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Column(name = "recipe_date_added", nullable = false)
    private Date dateAdded;


    @ManyToMany
    @JoinTable(name = "recipe_product",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "product_recipe_id"))
    private Set<ProductRecipe> productRecipeSet = new HashSet<>();



    @ManyToMany
    @JoinTable(name = "user_recipe",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<DiaryUser> diaryUserSet = new HashSet<>();

    public Recipe() {

    }


    public void addProductRecipeSet(ProductRecipe productRecipe) {
        productRecipeSet.add(productRecipe);
    }


    public Set<DiaryUser> getDiaryUserSet() {
        return diaryUserSet;
    }

    public void setDiaryUserSet(Set<DiaryUser> diaryUserSet) {
        this.diaryUserSet = diaryUserSet;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public double getProteins() {
        return proteins;
    }

    public void setProteins(double proteins) {
        this.proteins = proteins;
    }

    public double getFats() {
        return fats;
    }

    public void setFats(double fats) {
        this.fats = fats;
    }

    public double getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(double carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public double getCalorieContent() {
        return calorieContent;
    }

    public void setCalorieContent(double calorieContent) {
        this.calorieContent = calorieContent;
    }

    public Date getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }

    public Set<ProductRecipe> getProductRecipeSet() {
        return productRecipeSet;
    }

    public void setProductRecipeSet(Set<ProductRecipe> productSet) {
        this.productRecipeSet = productSet;
    }


    public void addDiaryUserSet(DiaryUser diaryUser) {
        diaryUserSet.add(diaryUser);
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "recipeId=" + recipeId +
                ", recipeName='" + recipeName + '\'' +
                ", proteins=" + proteins +
                ", fats=" + fats +
                ", carbohydrates=" + carbohydrates +
                ", calorieContent=" + calorieContent +
                ", dateAdded=" + dateAdded +
                '}';
    }
}
