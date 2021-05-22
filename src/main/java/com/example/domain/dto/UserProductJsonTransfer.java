package com.example.domain.dto;

public class UserProductJsonTransfer {
    private String newProduct;
    private String productParameter;

    public UserProductJsonTransfer(){

    }

    public String getNewProduct() {
        return newProduct;
    }

    public void setNewProduct(String newProduct) {
        this.newProduct = newProduct;
    }

    public String getProductParameter() {
        return productParameter;
    }

    public void setProductParameter(String productParameter) {
        this.productParameter = productParameter;
    }

    @Override
    public String toString() {
        return "UserProductJsonTransfer{" +
                "newProduct='" + newProduct + '\'' +
                ", productParameter='" + productParameter + '\'' +
                '}';
    }
}
