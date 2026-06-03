package com.ishanka.portfolio.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

@Data
public class ProjectRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private String githubUrl;
    private String liveDemoUrl;
    private String imageUrl;
    private List<String> technologies;
    private boolean isFeatured;
}