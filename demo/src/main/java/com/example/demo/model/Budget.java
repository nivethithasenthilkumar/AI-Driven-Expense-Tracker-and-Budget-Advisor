package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="budgets")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private Double monthlyLimit;
    private Double spent = 0.0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;
}
