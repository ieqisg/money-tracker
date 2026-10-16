package com.example.app.dto;

import java.math.BigDecimal;

import com.example.app.enums.TransactionTypeEnum;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class TransactionDto {

  @Enumerated(EnumType.STRING)
  @NotNull(message = "Transaction Type should not be empty")
  private TransactionTypeEnum transactionType;

  @NotNull(message = "Category should not be empty")
  private String category;

  @NotNull(message = "Amount should not be empty")
  @PositiveOrZero(message = "Amount should be greater than 0")
  private BigDecimal amount;

  private String description;

  @NotNull(message = "Date should not empty")
  private String date;

  @NotNull(message = "Time should not be empty")
  private String time;

  public void setTransactionType(TransactionTypeEnum transactionType) {
    this.transactionType = transactionType;
  }

  public TransactionTypeEnum getTransactionType() {
    return transactionType;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getCategory() {
    return category;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getDate() {
    return date;
  }

  public void setTime(String time) {
    this.time = time;
  }

  public String getTime() {
    return time;
  }
}
