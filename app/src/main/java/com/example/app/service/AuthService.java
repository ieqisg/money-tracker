package com.example.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.model.AuthRepository;

@Service
public class AuthService {

  @Autowired
  private AuthRepository authRepository;

  public void createUser(String email, String hashed_password, boolean isActive) {
    authRepository.insertUser(email, hashed_password, isActive);
  }
}
