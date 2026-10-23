package com.example.app.model;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;

import com.example.app.record.ProfileRecord;

@Repository
public class ProfileRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Transactional(rollbackFor = Exception.class)
  public void completeProfile(UUID userId, ProfileRecord profile) {

    jdbcTemplate.update(
        """
            INSERT INTO profile (user_id, current_savings, goal_savings, job_title, age, monthly_income, first_name, last_name)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
        userId, profile.currSavings(), profile.goalSavings(), profile.jobTitle(), profile.age(),
        profile.monthlyIncome(), profile.firstName(), profile.lastName());

    int updated = jdbcTemplate.update(
        "UPDATE users SET is_profile_complete = true WHERE id = ?", userId);

    if (updated != 1) {
      throw new IllegalStateException("User not found: " + userId);
    }
  }

  public ProfileRecord getProfile(UUID userId) {
    String sql = "SELECT current_savings, goal_savings, job_title, age, monthly_income, first_name, last_name FROM profile WHERE user_id = ?";
    try {
      return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> new ProfileRecord(
          rs.getString("first_name"),
          rs.getString("last_name"),
          rs.getInt("age"),
          rs.getString("job_title"),
          rs.getBigDecimal("current_savings"),
          rs.getBigDecimal("goal_savings"),
          rs.getBigDecimal("monthly_income")),
          userId);
    } catch (EmptyResultDataAccessException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found");
    }
  }

}
