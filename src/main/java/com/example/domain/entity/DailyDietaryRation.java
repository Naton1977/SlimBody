package com.example.domain.entity;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "daily_dietary_ration")
public class DailyDietaryRation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recording_id")
    private int id;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Column(name = "date_added", nullable = false)
    private Date dateAdded;

    @Column(name = "product_title")
    private String productTitle;

    @Column(name = "product_proteins", columnDefinition = "Float(10,2)")
    private double productProteins;

    @Column(name = "product_fats", columnDefinition = "Float(10,2)")
    private double productFats;

    @Column(name = "product_carbohydrates", columnDefinition = "Float(10,2)")
    private double productCarbohydrates;

    @Column(name = "colorie_content", columnDefinition = "Float(10,2)")
    private double calorieContent;

    @Column(name = "product_weight", columnDefinition = "Float(10,2)")
    private double productWeight;


    @ManyToMany
    @JoinTable(name = "user_daily_dietary_ration",
            joinColumns = @JoinColumn(name = "recording_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<DiaryUser> dailyDiaryUserSet = new HashSet<>();


    public void addDailyDiaryUserSet(DiaryUser diaryUser) {
        dailyDiaryUserSet.add(diaryUser);
    }


    public DailyDietaryRation(){

    }


    public DailyDietaryRation(Date dateAdded, String productTitle, double productProteins, double productFats, double productCarbohydrates, double productWeight, double calorieContent) {
        this.dateAdded = dateAdded;
        this.productTitle = productTitle;
        this.productProteins = productProteins;
        this.productFats = productFats;
        this.productCarbohydrates = productCarbohydrates;
        this.productWeight = productWeight;
        this.calorieContent = calorieContent;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public double getProductProteins() {
        return productProteins;
    }

    public void setProductProteins(double productProteins) {
        this.productProteins = productProteins;
    }

    public double getProductFats() {
        return productFats;
    }

    public void setProductFats(double productFats) {
        this.productFats = productFats;
    }

    public double getProductCarbohydrates() {
        return productCarbohydrates;
    }

    public void setProductCarbohydrates(double productCarbohydrates) {
        this.productCarbohydrates = productCarbohydrates;
    }

    public double getProductWeight() {
        return productWeight;
    }

    public void setProductWeight(double productWeight) {
        this.productWeight = productWeight;
    }

    public Set<DiaryUser> getDailyDiaryUserSet() {
        return dailyDiaryUserSet;
    }

    public void setDailyDiaryUserSet(Set<DiaryUser> dailyDiaryUserSet) {
        this.dailyDiaryUserSet = dailyDiaryUserSet;
    }


    public double getCalorieContent() {
        return calorieContent;
    }

    public void setCalorieContent(double calorieContent) {
        this.calorieContent = calorieContent;
    }

    @Override
    public String toString() {
        return "DailyDietaryRation{" +
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
