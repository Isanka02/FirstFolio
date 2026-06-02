package com.ishanka.portfolio.backend.repository;

import com.ishanka.portfolio.backend.model.Skill;
import com.ishanka.portfolio.backend.model.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByPortfolio(Portfolio portfolio);
    List<Skill> findByPortfolioAndCategory(Portfolio portfolio, Skill.Category category);
    boolean existsByPortfolioAndName(Portfolio portfolio, String name);
}