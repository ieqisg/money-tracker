package com.example.app.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class ProfileDto {
  @NotNull
  @PositiveOrZero
  private BigDecimal currSavings;

  @NotNull
  @PositiveOrZero
  private BigDecimal goalSavings;

  @NotBlank
  private String jobTitle;

  @Min(13)
  @Max(120)
  private int age;

  @NotNull
  @PositiveOrZero
  private BigDecimal monthlyIncome;

  public BigDecimal getCurrSavings() {
    return currSavings;
  }

  public void setCurrSavings(BigDecimal currSavings) {
    this.currSavings = currSavings;
  }

  public BigDecimal getGoalSavings() {
    return goalSavings;
  }

  public void setGoalSavings(BigDecimal goalSavings) {
    this.goalSavings = goalSavings;
  }

  public String getJobTitle() {
    return jobTitle;
  }

  public void setJobTitle(String jobTitle) {
    this.jobTitle = jobTitle;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public BigDecimal getMonthlyIncome() {
    return monthlyIncome;
  }

  public void setMonthlyIncome(BigDecimal monthlyIncome) {
    this.monthlyIncome = monthlyIncome;
  }
}
