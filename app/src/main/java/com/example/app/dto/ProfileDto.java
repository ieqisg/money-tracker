package com.example.app.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class ProfileDto {
  @NotBlank(message = "First name should not be empty")
  private String firstName;

  @NotBlank(message = "Last name should not be empty")
  private String lastName;

  @NotNull(message = "Current savings should not be empty")
  @PositiveOrZero
  private BigDecimal currSavings;

  @NotNull(message = "Goal Savings should not be empty")
  @PositiveOrZero(message = "Goal Savings should not be empty")
  private BigDecimal goalSavings;

  @NotBlank(message = "Job Title should not be empty")
  private String jobTitle;

  @Min(13)
  @Max(120)
  private int age;

  @NotNull(message = "Monthly Income should not be empty")
  @PositiveOrZero(message = "Monthly Income should be greater than 0")
  private BigDecimal monthlyIncome;

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

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
