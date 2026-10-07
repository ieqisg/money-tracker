package com.example.app.service;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.model.ProfileRepository;

@Service
public class ProfileService {
  @Autowired
  private ProfileRepository profileRepository;

  public void completeProfile(UUID userId, BigDecimal currSavings, BigDecimal goalSavings, String jobTitle, int age,
      BigDecimal monthlyIncome) {
    profileRepository.completeProfile(userId, currSavings, goalSavings, jobTitle, age, monthlyIncome);
  }
}
