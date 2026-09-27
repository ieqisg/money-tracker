package com.example.app.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.app.dto.ApiResponse;
import com.example.app.dto.AuthDto;
import com.example.app.dto.AuthResponseDto;
import com.example.app.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AuthController {

  @Autowired
  private AuthService authService;

  @PostMapping("/api/register")
  public ApiResponse<AuthDto> Register(@Valid @RequestBody AuthDto authDto) {

    authService.register(authDto.getEmail(), authDto.getPassword());
    return new ApiResponse<>("Registered successfully", true, null);
  }

  @PostMapping("/api/login")
  public ApiResponse<AuthResponseDto> Login(@Valid @RequestBody AuthDto authDto) {

    String token = authService.login(authDto.getEmail(), authDto.getPassword());
    return new ApiResponse<>("Login successfully", true, new AuthResponseDto(token));
  }

}
