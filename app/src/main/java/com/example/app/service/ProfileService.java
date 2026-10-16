package com.example.app.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.model.ProfileRepository;
import com.example.app.record.ProfileRecord;

@Service
public class ProfileService {
  @Autowired
  private ProfileRepository profileRepository;

  public void completeProfile(UUID userId, ProfileRecord profile) {
    profileRepository.completeProfile(userId, profile);
  }

  public ProfileRecord getProfile(UUID userId) {
    return profileRepository.getProfile(userId);
  }
}
