package com.ishanka.portfolio.backend.repository;

import com.ishanka.portfolio.backend.model.Project;
import com.ishanka.portfolio.backend.model.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByPortfolio(Portfolio portfolio);
    List<Project> findByPortfolioAndIsFeatured(Portfolio portfolio, boolean isFeatured);
}