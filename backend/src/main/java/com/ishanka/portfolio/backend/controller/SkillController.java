package com.ishanka.portfolio.backend.controller;

import com.ishanka.portfolio.backend.dto.ApiResponse;
import com.ishanka.portfolio.backend.dto.SkillRequest;
import com.ishanka.portfolio.backend.model.Skill;
import com.ishanka.portfolio.backend.service.SkillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SkillController {

    private final SkillService skillService;

    @PostMapping
    public ResponseEntity<ApiResponse> addSkill(
            @Valid @RequestBody SkillRequest request) {
        Skill skill = skillService.addSkill(request);
        return ResponseEntity.ok(
                new ApiResponse(true, "Skill added", skill));
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getMySkills() {
        List<Skill> skills = skillService.getMySkills();
        return ResponseEntity.ok(
                new ApiResponse(true, "Skills fetched", skills));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse> getSkillsByCategory(
            @PathVariable String category) {
        List<Skill> skills = skillService.getMySkillsByCategory(category);
        return ResponseEntity.ok(
                new ApiResponse(true, "Skills fetched", skills));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteSkill(
            @PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok(
                new ApiResponse(true, "Skill deleted", null));
    }
}