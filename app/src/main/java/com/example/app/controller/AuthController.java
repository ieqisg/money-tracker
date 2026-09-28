package com.example.app.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.app.dto.ApiResponse;
import com.example.app.dto.AuthDto;
import com.example.app.service.AuthService;

import jakarta.validation.Valid;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AuthController {
  @Value("${jwt.expiration}")
  private long jwtExpiration;
  @Autowired
  private AuthService authService;

  @PostMapping("/api/register")
  public ResponseEntity<ApiResponse<Void>> register(@Valid @RequestBody AuthDto authDto) {
    String token = authService.register(authDto.getEmail(), authDto.getPassword());

    ResponseCookie cookie = ResponseCookie.from("token", token)
        .httpOnly(true)
        .secure(false)
        .sameSite("Lax")
        .path("/")
        .maxAge(Duration.ofMillis(jwtExpiration))
        .build();

    return ResponseEntity.status(HttpStatus.CREATED)
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new ApiResponse<>("Registered successfully", true, null));
  }

  @PostMapping("/api/login")
  public ResponseEntity<ApiResponse<Void>> login(
      @Valid @RequestBody AuthDto authDto) {

    String token = authService.login(
        authDto.getEmail(),
        authDto.getPassword());

    ResponseCookie cookie = ResponseCookie.from("token", token)
        .httpOnly(true)
        .secure(false)
        .sameSite("Lax")
        .path("/")
        .maxAge(Duration.ofMillis(jwtExpiration))
        .build();

    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new ApiResponse<>("Login success", true, null));
  }

  @PostMapping("/api/logout")
  public ResponseEntity<ApiResponse<Void>> logout() {
    ResponseCookie cookie = ResponseCookie.from("token", "")
        .httpOnly(true).secure(false).sameSite("Lax").path("/").maxAge(0).build();

    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new ApiResponse<>("Logged out", true, null));
  }

}
