package com.example.app.record;

import java.math.BigDecimal;

import com.example.app.enums.TransactionTypeEnum;

public record TransactionRecord(
    TransactionTypeEnum transactionType,
    String category,
    BigDecimal amount,
    String description,
    String date,
    String time) {
}
