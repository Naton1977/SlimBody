package com.example.domain.dto;

public class ProductRecipeTransfer {
    private int productId;
    private double productWeight;

    public ProductRecipeTransfer() {

    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public double getProductWeight() {
        return productWeight;
    }

    public void setProductWeight(double productWeight) {
        this.productWeight = productWeight;
    }

    @Override
    public String toString() {
        return "ProductRecipeTransfer{" +
                "productId=" + productId +
                ", productWeight=" + productWeight +
                '}';
    }
}
