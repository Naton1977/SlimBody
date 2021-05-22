package com.example.domain.dto;

public class NewProductDto {
    private String productName;
    private String proteins;
    private String fats;
    private String carbohydrates;
    private String calorieContent;

    public NewProductDto() {

    }

    public NewProductDto(String productName, String proteins, String fats, String carbohydrates, String calorieContent) {
        this.productName = productName;
        this.proteins = proteins;
        this.fats = fats;
        this.carbohydrates = carbohydrates;
        this.calorieContent = calorieContent;
    }


    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProteins() {
        return proteins;
    }

    public void setProteins(String proteins) {
        this.proteins = proteins;
    }

    public String getFats() {
        return fats;
    }

    public void setFats(String fats) {
        this.fats = fats;
    }

    public String getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(String carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public String getCalorieContent() {
        return calorieContent;
    }

    public void setCalorieContent(String calorieContent) {
        this.calorieContent = calorieContent;
    }

    @Override
    public String toString() {
        return "NewProductDto{" +
                "productName='" + productName + '\'' +
                ", proteins='" + proteins + '\'' +
                ", fats='" + fats + '\'' +
                ", carbohydrates='" + carbohydrates + '\'' +
                ", calorieContent='" + calorieContent + '\'' +
                '}';
    }
}
