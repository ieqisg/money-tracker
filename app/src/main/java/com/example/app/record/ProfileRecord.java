package com.example.app.record;

import java.math.BigDecimal;
import java.util.UUID;

public record ProfileRecord(UUID user_id, BigDecimal currSavings, float goalSavings, String jobTitle, int age,
    BigDecimal monthlyIncome) {
}
