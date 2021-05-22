package com.example.domain.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "product_using_recipe")
public class ProductRecipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_recipe_id")
    private int productRecipeId;

    @Column(name = "product_recipe_name")
    private String productRecipeName;


    @Column(name = "proteins_recipe", columnDefinition = "Float(10,2)")
    private double proteins;


    @Column(name = "fats_recipe", columnDefinition = "Float(10,2)")
    private double fats;


    @Column(name = "carbohydrates_recipe", columnDefinition = "Float(10,2)")
    private double carbohydrates;


    @Column(name = "calorie_content_recipe", columnDefinition = "Float(10,2)")
    private double calorieContent;

    @Column(name = "weight_product_recipe", columnDefinition = "Float(10,2)")
    private double weightProductRecipe;


    @ManyToMany
    @JoinTable(name = "recipe_product",
            joinColumns = @JoinColumn(name = "product_recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id"))
    private Set<Recipe> recipeSet = new HashSet<>();

    public void addRecipeSet(Recipe recipe) {
        recipeSet.add(recipe);
    }

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

    public Set<Recipe> getRecipeSet() {
        return recipeSet;
    }

    public void setRecipeSet(Set<Recipe> recipeSet) {
        this.recipeSet = recipeSet;
    }

    @Override
    public String toString() {
        return "ProductRecipe{" +
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
