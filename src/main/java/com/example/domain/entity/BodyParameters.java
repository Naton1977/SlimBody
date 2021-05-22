package com.example.domain.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "body_parameters")
public class BodyParameters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "body_parameter_id")
    private int bodyParameterId;

    @Column(name = "weigth", columnDefinition = "Float(5,2) default 0.0")
    private double weight;

    @Column(name = "neck_girth", columnDefinition = "Float(5,2) default 0.0")
    private double neckGirth;

    @Column(name = "chest_girth", columnDefinition = "Float(5,2) default 0.0")
    private double chestGirth;

    @Column(name = "under_bus", columnDefinition = "Float(5,2) default 0.0")
    private double underBus;

    @Column(name = "waist", columnDefinition = "Float(5,2) default 0.0")
    private double waist;

    @Column(name = "abdominal_girth", columnDefinition = "Float(5,2) default 0.0")
    private double abdominalGirth;

    @Column(name = "hip_girth", columnDefinition = "Float(5,2) default 0.0")
    private double hipGirth;

    @Column(name = "thigh_girth", columnDefinition = "Float(5,2) default 0.0")
    private double thighGirth;

    @Column(name = "girth_under_the_knee", columnDefinition = "Float(5,2) default 0.0")
    private double girthUnderTheKnee;

    @Column(name = "calf_girth", columnDefinition = "Float(5,2) default 0.0")
    private double calfGirth;

    @Column(name = "ankle_girth", columnDefinition = "Float(5,2) default 0.0")
    private double ankleGirth;

    @Column(name = "shoulder_girth", columnDefinition = "Float(5,2) default 0.0")
    private double shoulderGirth;

    @Column(name = "forearm_girth", columnDefinition = "Float(5,2) default 0.0")
    private double forearmGirth;

    @Column(name = "wrist_girth", columnDefinition = "Float(5,2) default 0.0")
    private double wristGirth;


    @ManyToMany
    @JoinTable(name = "user_body_parameters",
            joinColumns = @JoinColumn(name = "body_parameter_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<DiaryUser> diaryUserSet = new HashSet<>();

    public BodyParameters() {

    }


    public BodyParameters(double weight, double neckGirth, double chestGirth, double underBus, double waist, double abdominalGirth, double hipGirth, double thighGirth, double girthUnderTheKnee, double calfGirth, double ankleGirth, double shoulderGirth, double forearmGirth, double wristGirth) {
        this.weight = weight;
        this.neckGirth = neckGirth;
        this.chestGirth = chestGirth;
        this.underBus = underBus;
        this.waist = waist;
        this.abdominalGirth = abdominalGirth;
        this.hipGirth = hipGirth;
        this.thighGirth = thighGirth;
        this.girthUnderTheKnee = girthUnderTheKnee;
        this.calfGirth = calfGirth;
        this.ankleGirth = ankleGirth;
        this.shoulderGirth = shoulderGirth;
        this.forearmGirth = forearmGirth;
        this.wristGirth = wristGirth;
    }

    public int getBodyParameterId() {
        return bodyParameterId;
    }

    public void setBodyParameterId(int bodyParameterId) {
        this.bodyParameterId = bodyParameterId;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getNeckGirth() {
        return neckGirth;
    }

    public void setNeckGirth(double neckGirth) {
        this.neckGirth = neckGirth;
    }

    public double getChestGirth() {
        return chestGirth;
    }

    public void setChestGirth(double chestGirth) {
        this.chestGirth = chestGirth;
    }

    public double getUnderBus() {
        return underBus;
    }

    public void setUnderBus(double underBus) {
        this.underBus = underBus;
    }

    public double getWaist() {
        return waist;
    }

    public void setWaist(double waist) {
        this.waist = waist;
    }

    public double getAbdominalGirth() {
        return abdominalGirth;
    }

    public void setAbdominalGirth(double abdominalGirth) {
        this.abdominalGirth = abdominalGirth;
    }

    public double getHipGirth() {
        return hipGirth;
    }

    public void setHipGirth(double hipGirth) {
        this.hipGirth = hipGirth;
    }

    public double getThighGirth() {
        return thighGirth;
    }

    public void setThighGirth(double thighGirth) {
        this.thighGirth = thighGirth;
    }

    public double getGirthUnderTheKnee() {
        return girthUnderTheKnee;
    }

    public void setGirthUnderTheKnee(double girthUnderTheKnee) {
        this.girthUnderTheKnee = girthUnderTheKnee;
    }

    public double getCalfGirth() {
        return calfGirth;
    }

    public void setCalfGirth(double calfGirth) {
        this.calfGirth = calfGirth;
    }

    public double getAnkleGirth() {
        return ankleGirth;
    }

    public void setAnkleGirth(double ankleGirth) {
        this.ankleGirth = ankleGirth;
    }

    public double getShoulderGirth() {
        return shoulderGirth;
    }

    public void setShoulderGirth(double shoulderGirth) {
        this.shoulderGirth = shoulderGirth;
    }

    public double getForearmGirth() {
        return forearmGirth;
    }

    public void setForearmGirth(double forearmGirth) {
        this.forearmGirth = forearmGirth;
    }

    public double getWristGirth() {
        return wristGirth;
    }

    public void setWristGirth(double wristGirth) {
        this.wristGirth = wristGirth;
    }

    public Set<DiaryUser> getDiaryUserSet() {
        return diaryUserSet;
    }

    public void setDiaryUserSet(Set<DiaryUser> diaryUserSet) {
        this.diaryUserSet = diaryUserSet;
    }

    public void addUserSet(DiaryUser diaryUser) {
        diaryUserSet.add(diaryUser);
    }

    public void addDiaryUserSet(DiaryUser diaryUser){
        diaryUserSet.add(diaryUser);
    }

    @Override
    public String toString() {
        return "BodyParameters{" +
                "bodyParameterId=" + bodyParameterId +
                ", weight=" + weight +
                ", neckGirth=" + neckGirth +
                ", chestGirth=" + chestGirth +
                ", underBus=" + underBus +
                ", waist=" + waist +
                ", abdominalGirth=" + abdominalGirth +
                ", hipGirth=" + hipGirth +
                ", thighGirth=" + thighGirth +
                ", girthUnderTheKnee=" + girthUnderTheKnee +
                ", calfGirth=" + calfGirth +
                ", ankleGirth=" + ankleGirth +
                ", shoulderGirth=" + shoulderGirth +
                ", forearmGirth=" + forearmGirth +
                ", wristGirth=" + wristGirth +
                '}';
    }
}
