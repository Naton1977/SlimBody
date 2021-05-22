package com.example.domain.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "product")
public class Product {


    public Product() {

    }

    @Column(name = "product_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;


    @Column(name = "product_name")
    private String productName;


    @Column(name = "proteins", columnDefinition = "Float(10,2)")
    private double proteins;


    @Column(name = "fats", columnDefinition = "Float(10,2)")
    private double fats;


    @Column(name = "carbohydrates", columnDefinition = "Float(10,2)")
    private double carbohydrates;


    @Column(name = "calorie_content", columnDefinition = "Float(10,2)")
    private double calorieContent;

    @ManyToMany
    @JoinTable(name = "user_product",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<DiaryUser> diaryUserSet = new HashSet<>();


    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
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

    public void addUserSet(DiaryUser diaryUser) {
        diaryUserSet.add(diaryUser);
    }

    public Set<DiaryUser> getUserSet() {
        return diaryUserSet;
    }

    public void setUserSet(Set<DiaryUser> diaryUserSet) {
        this.diaryUserSet = diaryUserSet;
    }

    public Set<DiaryUser> getDiaryUserSet() {
        return diaryUserSet;
    }

    public void setDiaryUserSet(Set<DiaryUser> diaryUserSet) {
        this.diaryUserSet = diaryUserSet;
    }


    @Override
    public String toString() {
        return "Product{" +
                "productId=" + productId +
                ", productName='" + productName + '\'' +
                ", proteins='" + proteins + '\'' +
                ", fats='" + fats + '\'' +
                ", carbohydrates='" + carbohydrates + '\'' +
                ", calorieContent='" + calorieContent + '\'' +
                '}';
    }


}
