package com.example.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class NewProductTheDailyDiet {
    private Integer productId;
    private Integer weight;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd@HH:mm",timezone = "Europe/Kiev")
    private Date time;
    private String productCategory;


    public NewProductTheDailyDiet(){

    }


    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(String productCategory) {
        this.productCategory = productCategory;
    }

    @Override
    public String toString() {
        return "NewProductTheDailyDiet{" +
                "productId=" + productId +
                ", weight=" + weight +
                ", time=" + time +
                ", productCategory='" + productCategory + '\'' +
                '}';
    }
}
