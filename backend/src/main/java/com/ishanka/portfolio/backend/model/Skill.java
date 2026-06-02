package com.ishanka.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "skills",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"portfolio_id", "name"}
    ))
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "portfolio_id", nullable = false)
    private Portfolio portfolio;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Enumerated(EnumType.STRING)
    private Level level;

    public enum Category {
        FRONTEND, BACKEND, DATABASE, DEVOPS, TOOLS, OTHER
    }

    public enum Level {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
}