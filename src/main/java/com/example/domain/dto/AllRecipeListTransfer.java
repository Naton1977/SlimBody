package com.example.domain.dto;

import java.util.List;

public class AllRecipeListTransfer {
    private int recipeId;
    private String recipeName;
    private double proteins;
    private double fats;
    private double carbohydrates;
    private double calorieContent;
    private String dateAdded;
    private List<ProductRecipeDto> productRecipes;


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

    public String getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(String dateAdded) {
        this.dateAdded = dateAdded;
    }

    public List<ProductRecipeDto> getProductRecipes() {
        return productRecipes;
    }

    public void setProductRecipes(List<ProductRecipeDto> productRecipes) {
        this.productRecipes = productRecipes;
    }

    @Override
    public String toString() {
        return "AllRecipeListTransfer{" +
                "recipeId=" + recipeId +
                ", recipeName='" + recipeName + '\'' +
                ", proteins=" + proteins +
                ", fats=" + fats +
                ", carbohydrates=" + carbohydrates +
                ", calorieContent=" + calorieContent +
                ", dateAdded='" + dateAdded + '\'' +
                '}';
    }
}
