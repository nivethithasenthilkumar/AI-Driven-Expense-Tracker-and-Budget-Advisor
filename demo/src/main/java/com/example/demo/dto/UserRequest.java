package com.example.demo.dto;

/**
 * Data Transfer Object (DTO) for user registration and login requests.
 * Used to safely handle incoming JSON data.
 */
public class UserRequest {
    private String email;
    private String password;

    // Default constructor
    public UserRequest() {}

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
