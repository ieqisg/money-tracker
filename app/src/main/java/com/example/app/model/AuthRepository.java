package com.example.app.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AuthRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public void insertUser(String email, String hashed_password, boolean isActive) {
    String sql = "INSERT INTO users(email, hashed_password, is_active) VALUES (?, ?, ?)";
    jdbcTemplate.update(sql, email, hashed_password, isActive);
  }
}
