package com.example.domain.dto;

public class ProductRecipeDto {
    private int productRecipeId;
    private String productRecipeName;
    private double proteins;
    private double fats;
    private double carbohydrates;
    private double calorieContent;
    private double weightProductRecipe;

    public int getProductRecipeId() {
        return productRecipeId;
    }

    public void setProductRecipeId(int productRecipeId) {
        this.productRecipeId = productRecipeId;
    }

    public String getProductRecipeName() {
        return productRecipeName;
    }

    public void setProductRecipeName(String productRecipeName) {
        this.productRecipeName = productRecipeName;
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

    public double getWeightProductRecipe() {
        return weightProductRecipe;
    }

    public void setWeightProductRecipe(double weightProductRecipe) {
        this.weightProductRecipe = weightProductRecipe;
    }

    @Override
    public String toString() {
        return "ProductRecipeDto{" +
                "productRecipeId=" + productRecipeId +
                ", productRecipeName='" + productRecipeName + '\'' +
                ", proteins=" + proteins +
                ", fats=" + fats +
                ", carbohydrates=" + carbohydrates +
                ", calorieContent=" + calorieContent +
                ", weightProductRecipe=" + weightProductRecipe +
                '}';
    }
}
