package com.ishanka.portfolio.backend.repository;

import com.ishanka.portfolio.backend.model.Portfolio;
import com.ishanka.portfolio.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    Optional<Portfolio> findByUser(User user);
    Optional<Portfolio> findByUserEmail(String email);
}