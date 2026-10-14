package com.example.app.service;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.model.ProfileRepository;
import com.example.app.record.ProfileRecord;

@Service
public class ProfileService {
  @Autowired
  private ProfileRepository profileRepository;

  public void completeProfile(UUID userId, BigDecimal currSavings, BigDecimal goalSavings, String jobTitle, int age,
      BigDecimal monthlyIncome, String firstName, String lastName) {
    profileRepository.completeProfile(userId, currSavings, goalSavings, jobTitle, age, monthlyIncome, firstName,
        lastName);
  }

  public ProfileRecord getProfile(UUID userId) {
    return profileRepository.getProfile(userId);
  }
}
