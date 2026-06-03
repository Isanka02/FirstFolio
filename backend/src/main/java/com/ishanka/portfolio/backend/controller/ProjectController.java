package com.ishanka.portfolio.backend.controller;

import com.ishanka.portfolio.backend.dto.ApiResponse;
import com.ishanka.portfolio.backend.dto.ProjectRequest;
import com.ishanka.portfolio.backend.model.Project;
import com.ishanka.portfolio.backend.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ApiResponse> addProject(
            @Valid @RequestBody ProjectRequest request) {
        Project project = projectService.addProject(request);
        return ResponseEntity.ok(
                new ApiResponse(true, "Project added", project));
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getMyProjects() {
        List<Project> projects = projectService.getMyProjects();
        return ResponseEntity.ok(
                new ApiResponse(true, "Projects fetched", projects));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequest request) {
        Project project = projectService.updateProject(id, request);
        return ResponseEntity.ok(
                new ApiResponse(true, "Project updated", project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProject(
            @PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(
                new ApiResponse(true, "Project deleted", null));
    }
}