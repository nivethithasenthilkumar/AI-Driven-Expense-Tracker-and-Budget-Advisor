package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.model.UserProfile;
import com.example.demo.repository.UserProfileRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserProfileRepository profileRepo;

    @Autowired
    private JwtUtil jwtUtil;

    private User getUserByToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer "))
            throw new RuntimeException("Missing Authorization header");

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/view")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {
        User user = getUserByToken(authHeader);

        return profileRepo.findByUser(user)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.ok(new UserProfile()));
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = System.currentTimeMillis() + "_" + 
                StringUtils.cleanPath(file.getOriginalFilename());

            Path uploadDir = Paths.get("uploads");

            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            Path filePath = uploadDir.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok(Map.of("fileName", fileName));
        } 
        catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody UserProfile updated) {

        User user = getUserByToken(authHeader);

        UserProfile profile = profileRepo.findByUser(user).orElse(new UserProfile());
        profile.setUser(user);

        profile.setFullName(updated.getFullName());
        profile.setDateOfBirth(updated.getDateOfBirth());
        profile.setGender(updated.getGender());
        profile.setLanguage(updated.getLanguage());
        profile.setCurrency(updated.getCurrency());
        profile.setPhone(updated.getPhone());
        profile.setOccupation(updated.getOccupation());
        profile.setMonthlyIncome(updated.getMonthlyIncome());
        profile.setTargetSavings(updated.getTargetSavings());
        profile.setTargetExpenses(updated.getTargetExpenses());
        profile.setAddress(updated.getAddress());
        profile.setEducation(updated.getEducation());
        profile.setAvatar(updated.getAvatar());
        profile.setBio(updated.getBio());

        profileRepo.save(profile);

        return ResponseEntity.ok(Map.of("message", "Profile saved!", "profile", profile));
    }
}
