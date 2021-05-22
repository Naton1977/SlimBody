package com.example.domain.dto;

public class UserDailyDietaryRationTransfer {
    private long id;

    private String dateAdded;

    private String productTitle;

    private String productProteins;

    private String productFats;

    private String productCarbohydrates;

    private String calorieContent;

    private String productWeight;

    public UserDailyDietaryRationTransfer(){

    }

    public UserDailyDietaryRationTransfer(int id, String dateAdded, String productTitle, String productProteins, String productFats, String productCarbohydrates, String calorieContent, String productWeight) {
        this.id = id;
        this.dateAdded = dateAdded;
        this.productTitle = productTitle;
        this.productProteins = productProteins;
        this.productFats = productFats;
        this.productCarbohydrates = productCarbohydrates;
        this.calorieContent = calorieContent;
        this.productWeight = productWeight;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(String dateAdded) {
        this.dateAdded = dateAdded;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public String getProductProteins() {
        return productProteins;
    }

    public void setProductProteins(String productProteins) {
        this.productProteins = productProteins;
    }

    public String getProductFats() {
        return productFats;
    }

    public void setProductFats(String productFats) {
        this.productFats = productFats;
    }

    public String getProductCarbohydrates() {
        return productCarbohydrates;
    }

    public void setProductCarbohydrates(String productCarbohydrates) {
        this.productCarbohydrates = productCarbohydrates;
    }

    public String getCalorieContent() {
        return calorieContent;
    }

    public void setCalorieContent(String calorieContent) {
        this.calorieContent = calorieContent;
    }

    public String getProductWeight() {
        return productWeight;
    }

    public void setProductWeight(String productWeight) {
        this.productWeight = productWeight;
    }

    @Override
    public String toString() {
        return "UserDailyDietaryRationTransfer{" +
                "id=" + id +
                ", dateAdded=" + dateAdded +
                ", productTitle='" + productTitle + '\'' +
                ", productProteins=" + productProteins +
                ", productFats=" + productFats +
                ", productCarbohydrates=" + productCarbohydrates +
                ", calorieContent=" + calorieContent +
                ", productWeight=" + productWeight +
                '}';
    }
}
