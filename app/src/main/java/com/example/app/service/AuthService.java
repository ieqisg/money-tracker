package com.example.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.app.exception.EmailAlreadyExistException;
import com.example.app.model.AuthRepository;

@Service
public class AuthService {
  @Autowired
  private JwtService jwtService;
  @Autowired
  private AuthRepository authRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public void register(String email, String password) {
    if (authRepository.emailAlreadyExist(email)) {
      throw new EmailAlreadyExistException("Email already exists.");
    }
    String hashed_password = passwordEncoder.encode(password);
    authRepository.createUser(email, hashed_password, true);
  }

  public String login(String email, String password) {
    String hashed_password = authRepository.findHashedPasswordByEmail(email);
    if (hashed_password == null || !passwordEncoder.matches(password, hashed_password)) {
      throw new BadCredentialsException("Invalid email or password");
    }
    return jwtService.generateJwtToken(email);
  }
}
