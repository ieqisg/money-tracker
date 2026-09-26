package com.example.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.app.exception.EmailAlreadyExistException;
import com.example.app.model.AuthRepository;

@Service
public class AuthService {

  @Autowired
  private AuthRepository authRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public void createUser(String email, String password, boolean isActive) {
    if (authRepository.emailAlreadyExist(email)) {
      throw new EmailAlreadyExistException("Email already exists.");
    }
    String hashed_password = passwordEncoder.encode(password);
    authRepository.insertUser(email, hashed_password, isActive);
  }
}
