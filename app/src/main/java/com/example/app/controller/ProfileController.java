package com.example.app.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.dto.ProfileDto;
import com.example.app.service.ProfileService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class ProfileController {

  @Autowired
  private ProfileService profileService;

  @GetMapping("/api/profile")
  public String getProfile(Authentication authentication) {
    return "Tite";
  }

  @PostMapping("/api/profile")
  public ResponseEntity<ProfileDto> completeProfile(
      @RequestBody ProfileDto profileDto,
      Authentication authentication) {

    UUID userId = UUID.fromString(authentication.getName());

    profileService.completeProfile(
        userId,
        profileDto.getCurrSavings(),
        profileDto.getGoalSavings(),
        profileDto.getJobTitle(),
        profileDto.getAge(),
        profileDto.getMonthlyIncome());

    return new ResponseEntity<>(profileDto, HttpStatus.CREATED);
  }
}
