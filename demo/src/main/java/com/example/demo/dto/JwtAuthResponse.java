package com.example.demo.dto;

public class JwtAuthResponse {
    private String token;

    // Default constructor
    public JwtAuthResponse() {
    }

    // Constructor with token
    public JwtAuthResponse(String token) {
        this.token = token;
    }

    // Getter
    public String getToken() {
        return token;
    }

    // Setter
    public void setToken(String token) {
        this.token = token;
    }
}
