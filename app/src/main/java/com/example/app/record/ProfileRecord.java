package com.example.app.record;

import java.math.BigDecimal;

public record ProfileRecord(
    String firstName,
    String lastName,
    int age,
    String jobTitle,
    BigDecimal currSavings,
    BigDecimal goalSavings,
    BigDecimal monthlyIncome) {
}
