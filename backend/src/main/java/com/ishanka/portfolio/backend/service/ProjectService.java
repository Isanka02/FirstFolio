package com.ishanka.portfolio.backend.service;

import com.ishanka.portfolio.backend.dto.ProjectRequest;
import com.ishanka.portfolio.backend.model.Portfolio;
import com.ishanka.portfolio.backend.model.Project;
import com.ishanka.portfolio.backend.model.User;
import com.ishanka.portfolio.backend.repository.PortfolioRepository;
import com.ishanka.portfolio.backend.repository.ProjectRepository;
import com.ishanka.portfolio.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    public Project addProject(ProjectRequest request) {
        Portfolio portfolio = getCurrentUserPortfolio();

        Project project = new Project();
        project.setPortfolio(portfolio);
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setGithubUrl(request.getGithubUrl());
        project.setLiveDemoUrl(request.getLiveDemoUrl());
        project.setImageUrl(request.getImageUrl());
        project.setTechnologies(request.getTechnologies());
        project.setFeatured(request.isFeatured());

        return projectRepository.save(project);
    }

    public List<Project> getMyProjects() {
        Portfolio portfolio = getCurrentUserPortfolio();
        return projectRepository.findByPortfolio(portfolio);
    }

    public Project updateProject(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        validateOwnership(project);

        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setGithubUrl(request.getGithubUrl());
        project.setLiveDemoUrl(request.getLiveDemoUrl());
        project.setImageUrl(request.getImageUrl());
        project.setTechnologies(request.getTechnologies());
        project.setFeatured(request.isFeatured());

        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        validateOwnership(project);
        projectRepository.delete(project);
    }

    private void validateOwnership(Project project) {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        if (!project.getPortfolio().getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }
    }

    private Portfolio getCurrentUserPortfolio() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return portfolioRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));
    }
}