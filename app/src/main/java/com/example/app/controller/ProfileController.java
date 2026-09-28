package com.example.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {

  @GetMapping("/api/profile")
  public String GetProfile() {
    return "Profile";
  }

}
