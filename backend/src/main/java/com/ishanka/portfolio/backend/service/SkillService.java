package com.ishanka.portfolio.backend.service;

import com.ishanka.portfolio.backend.dto.SkillRequest;
import com.ishanka.portfolio.backend.model.Portfolio;
import com.ishanka.portfolio.backend.model.Skill;
import com.ishanka.portfolio.backend.model.User;
import com.ishanka.portfolio.backend.repository.PortfolioRepository;
import com.ishanka.portfolio.backend.repository.SkillRepository;
import com.ishanka.portfolio.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    public Skill addSkill(SkillRequest request) {
        Portfolio portfolio = getCurrentUserPortfolio();

        if (skillRepository.existsByPortfolioAndName(
                portfolio, request.getName())) {
            throw new RuntimeException("Skill already exists");
        }

        Skill skill = new Skill();
        skill.setPortfolio(portfolio);
        skill.setName(request.getName());

        if (request.getCategory() != null)
            skill.setCategory(
                Skill.Category.valueOf(request.getCategory()));
        if (request.getLevel() != null)
            skill.setLevel(
                Skill.Level.valueOf(request.getLevel()));

        return skillRepository.save(skill);
    }

    public List<Skill> getMySkills() {
        Portfolio portfolio = getCurrentUserPortfolio();
        return skillRepository.findByPortfolio(portfolio);
    }

    public List<Skill> getMySkillsByCategory(String category) {
        Portfolio portfolio = getCurrentUserPortfolio();
        return skillRepository.findByPortfolioAndCategory(
                portfolio, Skill.Category.valueOf(category));
    }

    public void deleteSkill(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found"));
        validateOwnership(skill);
        skillRepository.delete(skill);
    }

    private void validateOwnership(Skill skill) {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        if (!skill.getPortfolio().getUser().getEmail().equals(email)) {
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