package com.example.app.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AuthRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public void createUser(String email, String hashed_password, boolean isActive) {
    String sql = "INSERT INTO users(email, hashed_password, is_active, is_profile_complete) VALUES (?, ?, ?, ?)";
    jdbcTemplate.update(sql, email, hashed_password, true, false);
  }

  public boolean emailAlreadyExist(String email) {
    String sql = "SELECT COUNT(*) FROM users where email = ?";
    Integer count = jdbcTemplate.queryForObject(sql, Integer.class, email);
    return count != null && count > 0;
  }

  public String findUserByEmail(String email) {
    String sql = "SELECT email FROM users where email = ?";
    String foundEmail = jdbcTemplate.queryForObject(sql, String.class, email);
    return "The email is: " + foundEmail;
  }

  public String findHashedPasswordByEmail(String email) {
    String sql = "SELECT hashed_password FROM users WHERE email = ?";
    try {
      return jdbcTemplate.queryForObject(sql, String.class, email);
    } catch (EmptyResultDataAccessException ex) {
      return null;
    }

  }
}
