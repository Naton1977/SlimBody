package com.example.domain.dto;

public class RecipeTransfer {
    private String recipeTitle;
    private Double recipeWeight;
    public RecipeTransfer(){

    }

    public String getRecipeTitle() {
        return recipeTitle;
    }

    public void setRecipeTitle(String recipeTitle) {
        this.recipeTitle = recipeTitle;
    }

    public Double getRecipeWeight() {
        return recipeWeight;
    }

    public void setRecipeWeight(Double recipeWeight) {
        this.recipeWeight = recipeWeight;
    }

    @Override
    public String toString() {
        return "RecipeTransfer{" +
                "recipeTitle='" + recipeTitle + '\'' +
                ", recipeWeight=" + recipeWeight +
                '}';
    }
}
