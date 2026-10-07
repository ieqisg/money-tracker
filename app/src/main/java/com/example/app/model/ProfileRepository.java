package com.example.app.model;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ProfileRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Transactional(rollbackFor = Exception.class)
  public void completeProfile(UUID userId, BigDecimal currSavings, BigDecimal goalSavings,
      String jobTitle, int age, BigDecimal monthlyIncome) {

    jdbcTemplate.update("""
        INSERT INTO profile (user_id, current_savings, goal_savings, job_title, age, monthly_income)
        VALUES (?, ?, ?, ?, ?, ?)
        """, userId, currSavings, goalSavings, jobTitle, age, monthlyIncome);

    int updated = jdbcTemplate.update(
        "UPDATE users SET is_profile_complete = true WHERE id = ?", userId);

    if (updated != 1) {
      throw new IllegalStateException("User not found: " + userId);
    }
  }

}
