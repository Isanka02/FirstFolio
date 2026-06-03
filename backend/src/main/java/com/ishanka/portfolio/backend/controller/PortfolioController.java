package com.ishanka.portfolio.backend.controller;

import com.ishanka.portfolio.backend.dto.ApiResponse;
import com.ishanka.portfolio.backend.dto.PortfolioRequest;
import com.ishanka.portfolio.backend.model.Portfolio;
import com.ishanka.portfolio.backend.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/api/portfolio/me")
    public ResponseEntity<ApiResponse> getMyPortfolio() {
        Portfolio portfolio = portfolioService.getMyPortfolio();
        return ResponseEntity.ok(
                new ApiResponse(true, "Portfolio fetched", portfolio));
    }

    @PutMapping("/api/portfolio/me")
    public ResponseEntity<ApiResponse> updatePortfolio(
            @RequestBody PortfolioRequest request) {
        Portfolio portfolio = portfolioService.updatePortfolio(request);
        return ResponseEntity.ok(
                new ApiResponse(true, "Portfolio updated", portfolio));
    }

    @PutMapping("/api/portfolio/me/publish")
    public ResponseEntity<ApiResponse> publishPortfolio() {
        Portfolio portfolio = portfolioService.publishPortfolio();
        return ResponseEntity.ok(
                new ApiResponse(true, "Portfolio published", portfolio));
    }

    @PutMapping("/api/portfolio/me/unpublish")
    public ResponseEntity<ApiResponse> unpublishPortfolio() {
        Portfolio portfolio = portfolioService.unpublishPortfolio();
        return ResponseEntity.ok(
                new ApiResponse(true, "Portfolio unpublished", portfolio));
    }

    @GetMapping("/portfolio/{email}")
    public ResponseEntity<ApiResponse> getPublicPortfolio(
            @PathVariable String email) {
        Portfolio portfolio = portfolioService.getPublicPortfolio(email);
        return ResponseEntity.ok(
                new ApiResponse(true, "Portfolio fetched", portfolio));
    }
}