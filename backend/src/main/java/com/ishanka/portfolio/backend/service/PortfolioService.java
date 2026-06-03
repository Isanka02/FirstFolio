package com.ishanka.portfolio.backend.service;

import com.ishanka.portfolio.backend.dto.PortfolioRequest;
import com.ishanka.portfolio.backend.model.Portfolio;
import com.ishanka.portfolio.backend.model.User;
import com.ishanka.portfolio.backend.repository.PortfolioRepository;
import com.ishanka.portfolio.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    public Portfolio getMyPortfolio() {
        User user = getCurrentUser();
        return portfolioRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));
    }

    public Portfolio updatePortfolio(PortfolioRequest request) {
        User user = getCurrentUser();
        Portfolio portfolio = portfolioRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));

        if (request.getHeadline() != null)
            portfolio.setHeadline(request.getHeadline());
        if (request.getBio() != null)
            portfolio.setBio(request.getBio());
        if (request.getGithubUrl() != null)
            portfolio.setGithubUrl(request.getGithubUrl());
        if (request.getLinkedinUrl() != null)
            portfolio.setLinkedinUrl(request.getLinkedinUrl());
        if (request.getWebsiteUrl() != null)
            portfolio.setWebsiteUrl(request.getWebsiteUrl());
        if (request.getProfileImageUrl() != null)
            portfolio.setProfileImageUrl(request.getProfileImageUrl());
        if (request.getResumeUrl() != null)
            portfolio.setResumeUrl(request.getResumeUrl());
        if (request.getTemplateType() != null)
            portfolio.setTemplateType(
                Portfolio.TemplateType.valueOf(request.getTemplateType()));

        return portfolioRepository.save(portfolio);
    }

    public Portfolio publishPortfolio() {
        User user = getCurrentUser();
        Portfolio portfolio = portfolioRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));
        portfolio.setPublished(true);
        return portfolioRepository.save(portfolio);
    }

    public Portfolio unpublishPortfolio() {
        User user = getCurrentUser();
        Portfolio portfolio = portfolioRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));
        portfolio.setPublished(false);
        return portfolioRepository.save(portfolio);
    }

    public Portfolio getPublicPortfolio(String email) {
        return portfolioRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}