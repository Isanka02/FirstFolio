package com.ishanka.portfolio.backend.dto;

import lombok.Data;

@Data
public class PortfolioRequest {
    private String headline;
    private String bio;
    private String githubUrl;
    private String linkedinUrl;
    private String websiteUrl;
    private String profileImageUrl;
    private String resumeUrl;
    private String templateType;
}