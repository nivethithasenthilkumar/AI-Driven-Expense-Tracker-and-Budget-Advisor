package com.example.demo.controller;

import com.example.demo.model.Budget;
import com.example.demo.model.User;
import com.example.demo.repository.BudgetRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    public BudgetController(BudgetRepository budgetRepository, UserRepository userRepository) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
    }

    private User getUser(Principal principal) {
        return userRepository.findByEmail(principal.getName()).orElse(null);
    }

    @GetMapping
    public ResponseEntity<?> list(Principal principal) {
        User u = getUser(principal);
        List<Budget> budgets = budgetRepository.findByUser(u);
        return ResponseEntity.ok(budgets);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> body, Principal principal) {
        User u = getUser(principal);
        String category = (String) body.get("category");
        Double limit = Double.valueOf(body.get("monthlyLimit").toString());

        Budget b = budgetRepository.findByUserAndCategory(u, category)
                .orElse(new Budget());
        b.setCategory(category);
        b.setMonthlyLimit(limit);
        b.setUser(u);

        budgetRepository.save(b);
        return ResponseEntity.ok(b);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Principal principal) {
        User u = getUser(principal);
        return budgetRepository.findById(id).map(b -> {
            if (!b.getUser().getId().equals(u.getId()))
                return ResponseEntity.status(403).build();

            budgetRepository.delete(b);
            return ResponseEntity.ok(Map.of("deleted", true));
        }).orElse(ResponseEntity.notFound().build());
    }
}
