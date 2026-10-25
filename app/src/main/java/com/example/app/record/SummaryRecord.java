package com.example.app.record;

import java.math.BigDecimal;

public record SummaryRecord(BigDecimal total_income, BigDecimal total_expense, BigDecimal total_savings) {
}
