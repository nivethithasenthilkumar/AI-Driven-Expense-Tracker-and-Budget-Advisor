package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User newUser) {
        Map<String, Object> response = new HashMap<>();

        try {
            // 1️⃣ Email already used?
            Optional<User> existingUser = userRepository.findByEmail(newUser.getEmail());
            if (existingUser.isPresent()) {
                response.put("error", "Email already exists!");
                return ResponseEntity.badRequest().body(response);
            }

            // 2️⃣ Validate required fields
            if (newUser.getEmail() == null || newUser.getPassword() == null || newUser.getName() == null) {
                response.put("error", "Please fill all required fields!");
                return ResponseEntity.badRequest().body(response);
            }

            // 3️⃣ Encode password
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

            // 4️⃣ Set default role
            newUser.setRole("USER");

            // 5️⃣ Save user
            User savedUser = userRepository.save(newUser);

            // 6️⃣ Generate JWT token
            String token = jwtUtil.generateToken(savedUser.getEmail());

            // 7️⃣ Build response to match frontend
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", savedUser.getId());
            userData.put("name", savedUser.getName());
            userData.put("email", savedUser.getEmail());

            response.put("token", token);
            response.put("user", userData);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", "Registration failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Map<String, Object> response = new HashMap<>();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            String token = jwtUtil.generateToken(loginRequest.getEmail());

            Map<String, Object> userData = new HashMap<>();
            userData.put("email", loginRequest.getEmail());

            response.put("token", token);
            response.put("user", userData);
            response.put("message", "Login successful");

            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            response.put("error", "Invalid email or password!");
            return ResponseEntity.status(401).body(response);
        }
    }
}
