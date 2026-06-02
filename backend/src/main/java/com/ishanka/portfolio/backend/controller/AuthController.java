package com.ishanka.portfolio.backend.controller;

import com.ishanka.portfolio.backend.dto.ApiResponse;
import com.ishanka.portfolio.backend.dto.AuthResponse;
import com.ishanka.portfolio.backend.dto.LoginRequest;
import com.ishanka.portfolio.backend.dto.RegisterRequest;
import com.ishanka.portfolio.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(
            @Valid @RequestBody RegisterRequest request) {
        AuthResponse authResponse = authService.register(request);
        return ResponseEntity.ok(
                new ApiResponse(true, "Registration successful", authResponse));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(
            @Valid @RequestBody LoginRequest request) {
        AuthResponse authResponse = authService.login(request);
        return ResponseEntity.ok(
                new ApiResponse(true, "Login successful", authResponse));
    }
}