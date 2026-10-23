package com.example.app.model;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;

import com.example.app.enums.TransactionTypeEnum;
import com.example.app.record.TransactionRecord;

@Repository
public class TransactionRepository {
  @Autowired
  private JdbcTemplate jdbcTemplate;

  public List<TransactionRecord> getTransaction(UUID userId, int limit, int offset) {
    String sql = """
        SELECT transaction_type, category, amount, description, date, time
        FROM transactions WHERE user_id = ?
        ORDER BY date DESC, time DESC
        LIMIT ? OFFSET ?
        """;

    return jdbcTemplate.query(sql, (rs, rowNum) -> new TransactionRecord(
        TransactionTypeEnum.valueOf(rs.getString("transaction_type").toUpperCase()),
        rs.getString("category"),
        rs.getBigDecimal("amount"),
        rs.getString("description"),
        rs.getString("date"),
        rs.getString("time")), userId, limit, offset);

  }

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
