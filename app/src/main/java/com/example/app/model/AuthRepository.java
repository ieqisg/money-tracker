package com.example.app.model;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.app.record.AuthRecord;

@Repository
public class AuthRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public UUID createUser(String email, String hashedPassword, boolean isActive) {
    String sql = "INSERT INTO users(email, hashed_password, is_active, is_profile_complete) " +
        "VALUES (?, ?, ?, ?) RETURNING id";
    return jdbcTemplate.queryForObject(sql, UUID.class, email, hashedPassword, isActive, false);
  }

  public boolean emailAlreadyExist(String email) {
    String sql = "SELECT COUNT(*) FROM users where email = ?";
    Integer count = jdbcTemplate.queryForObject(sql, Integer.class, email);
    return count != null && count > 0;
  }

  public AuthRecord findAuthRecordByEmail(String email) {
    String sql = "SELECT id, hashed_password FROM users WHERE email = ?";
    try {
      return jdbcTemplate.queryForObject(sql,
          (rs, rowNum) -> new AuthRecord((UUID) rs.getObject("id"), rs.getString("hashed_password")), email);
    } catch (EmptyResultDataAccessException ex) {
      return null;
    }
  }

  public boolean isProfileComplete(UUID id) {
    String sql = "SELECT is_profile_complete FROM users WHERE id = ?";
    try {
      Boolean result = jdbcTemplate.queryForObject(sql, Boolean.class, id);
      return result != null && result;
    } catch (EmptyResultDataAccessException ex) {
      return false;
    }
  }
}
