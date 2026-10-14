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
import com.example.app.record.ProfileRecord;
import com.example.app.service.ProfileService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class ProfileController {

  @Autowired
  private ProfileService profileService;

  @GetMapping("/api/profile")
  public ResponseEntity<ProfileRecord> getProfile(Authentication authentication) {
    UUID userId = UUID.fromString(authentication.getName());
    ProfileRecord profile = profileService.getProfile(userId);
    if (profile == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(profile);
  }

  @PostMapping("/api/profile")
  public ResponseEntity<ProfileDto> completeProfile(
      @Valid @RequestBody ProfileDto profileDto,
      Authentication authentication) {

    UUID userId = UUID.fromString(authentication.getName());

    profileService.completeProfile(
        userId,
        profileDto.getCurrSavings(),
        profileDto.getGoalSavings(),
        profileDto.getJobTitle(),
        profileDto.getAge(),
        profileDto.getMonthlyIncome(),
        profileDto.getFirstName(),
        profileDto.getLastName());

    return new ResponseEntity<>(profileDto, HttpStatus.CREATED);
  }
}
