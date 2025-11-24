package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private LocalDate dateOfBirth;
    private String gender;
    private String language;
    private String currency;
    private String phone;
    private String occupation;
    private BigDecimal monthlyIncome;
    private BigDecimal targetSavings;
    private BigDecimal targetExpenses;
    private String address;
    private String education;
    private String avatar;

    @Column(length = 500)
    private String bio;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
