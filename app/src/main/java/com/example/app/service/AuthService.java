package com.example.app.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.app.exception.EmailAlreadyExistException;

import com.example.app.model.AuthRepository;
import com.example.app.record.AuthRecord;

@Service
public class AuthService {
  @Autowired
  private JwtService jwtService;
  @Autowired
  private AuthRepository authRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public String register(String email, String password) {
    email = email.trim().toLowerCase();
    if (authRepository.emailAlreadyExist(email)) {
      throw new EmailAlreadyExistException("Email already exists.");
    }
    String hashedPassword = passwordEncoder.encode(password);
    UUID userId = authRepository.createUser(email, hashedPassword, true);
    return jwtService.generateJwtToken(userId.toString(), email);
  }

  public String login(String email, String password) {
    email = email.trim().toLowerCase();
    AuthRecord record = authRepository.findAuthRecordByEmail(email);
    if (record == null || !passwordEncoder.matches(password, record.hashedPassword())) {
      throw new BadCredentialsException("Invalid email or password");
    }
    return jwtService.generateJwtToken(record.id().toString(), email);
  }

  public boolean isProfileComplete(String userId) {
    UUID id = UUID.fromString(userId);
    return authRepository.isProfileComplete(id);
  }
}
