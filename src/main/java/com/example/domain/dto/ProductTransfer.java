package com.example.domain.dto;

public class ProductTransfer implements Comparable<ProductTransfer> {

    private long productId;
    private String productName;
    private String proteins;
    private String fats;
    private String carbohydrates;
    private String calorieContent;
    private String categoryProduct;

    public ProductTransfer(){

    }


    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
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

    public String getCategoryProduct() {
        return categoryProduct;
    }

    public void setCategoryProduct(String categoryProduct) {
        this.categoryProduct = categoryProduct;
    }

    @Override
    public String toString() {
        return "ProductTransfer{" +
                "productId=" + productId +
                ", productName='" + productName + '\'' +
                ", proteins='" + proteins + '\'' +
                ", fats='" + fats + '\'' +
                ", carbohydrates='" + carbohydrates + '\'' +
                ", calorieContent='" + calorieContent + '\'' +
                ", categoryProduct='" + categoryProduct + '\'' +
                '}';
    }

    @Override
    public int compareTo(ProductTransfer o) {
        return productName.compareTo(o.getProductName());
    }
}
