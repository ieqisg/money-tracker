package com.example.app.model;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;

import com.example.app.enums.TransactionTypeEnum;
import com.example.app.record.CategoryTotalRecord;
import com.example.app.record.SummaryRecord;
import com.example.app.record.TransactionRecord;

@Repository
public class TransactionRepository {
  @Autowired
  private JdbcTemplate jdbcTemplate;

  public List<TransactionRecord> getTransaction(
      UUID userId, int year, int month, int limit, int offset) {

    String sql = """
        SELECT id, transaction_type, category, amount, description, "date", "time"
        FROM transactions
        WHERE user_id = ?
          AND "date" >= ?
          AND "date" <  ?
        ORDER BY "date" DESC, "time" DESC, id DESC
        LIMIT ? OFFSET ?
        """;

    LocalDate start = LocalDate.of(year, month, 1);

    return jdbcTemplate.query(sql, (rs, rowNum) -> new TransactionRecord(
        TransactionTypeEnum.valueOf(rs.getString("transaction_type").toUpperCase()),
        rs.getString("category"),
        rs.getBigDecimal("amount"),
        rs.getString("description"),
        rs.getString("date"),
        rs.getString("time")), userId, start, start.plusMonths(1), limit, offset);

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

  public SummaryRecord getSummary(UUID userId, int year, int month) {
    String sql = """
        SELECT
          COALESCE(SUM(CASE WHEN transaction_type = 'INCOME'  THEN amount END), 0) AS total_income,
          COALESCE(SUM(CASE WHEN transaction_type = 'EXPENSE' THEN amount END), 0) AS total_expense,
          COALESCE(SUM(CASE WHEN transaction_type = 'SAVINGS' THEN amount END), 0) AS total_savings
        FROM transactions
        WHERE user_id = ?
          AND "date" >= ?
          AND "date" <  ?
        """;

    LocalDate start = LocalDate.of(year, month, 1);

    return jdbcTemplate.queryForObject(sql,
        (rs, rowNum) -> new SummaryRecord(
            rs.getBigDecimal("total_income"),
            rs.getBigDecimal("total_expense"),
            rs.getBigDecimal("total_savings")),
        userId, start, start.plusMonths(1));
  }

  public List<CategoryTotalRecord> getCategoryBreakdown(
      UUID userId, TransactionTypeEnum type, int year, int month) {

    String sql = """
        SELECT category, SUM(amount) AS total
        FROM transactions
        WHERE user_id = ?
          AND transaction_type = ?::"transactionType"
          AND "date" >= ?
          AND "date" <  ?
        GROUP BY category
        ORDER BY total DESC
        """;

    LocalDate start = LocalDate.of(year, month, 1);

    return jdbcTemplate.query(sql,
        (rs, rowNum) -> new CategoryTotalRecord(
            rs.getString("category"),
            rs.getBigDecimal("total")),
        userId, type.name(), start, start.plusMonths(1));
  }
}
