package com.example.app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDto {

  @NotBlank(message = "Email is required")
  @Email(message = "Email must be valid")
  private String email;

  @NotBlank(message = "Password is required")
  @Size(min = 8, message = "Password must be greater than 8 characters")
  private String password;

  private boolean isActive;

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  public boolean getIsActive() {
    return isActive;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setIsActive(boolean isActive) {
    this.isActive = isActive;
  }
}
