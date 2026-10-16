package com.example.app.model;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;

import com.example.app.record.TransactionRecord;

@Repository
public class TransactionRepository {
  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Transactional
  public void addTransaction(UUID userId, TransactionRecord transaction) {
    jdbcTemplate.update(
        """
            INSERT INTO transactions (user_id, transaction_type, description, category, amount, "date", "time")
            VALUES (?, ?::"transactionType", ?, ?, ?, ?::date, ?::time)
            """,
        userId,
        transaction.transactionType().name(),
        transaction.description(),
        transaction.category(),
        transaction.amount(),
        transaction.date(),
        transaction.time());
  }
}
