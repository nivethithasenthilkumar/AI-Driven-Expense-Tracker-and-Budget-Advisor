package com.example.demo.controller;

import com.example.demo.model.Transaction;
import com.example.demo.model.User;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionController(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    private User getUser(Principal principal) {
        return userRepository.findByEmail(principal.getName()).orElse(null);
    }

    @GetMapping
    public ResponseEntity<?> list(Principal principal) {
        User u = getUser(principal);
        List<Transaction> list = transactionRepository.findByUserOrderByCreatedAtDesc(u);
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> body, Principal principal) {
        User u = getUser(principal);
        Transaction t = new Transaction();
        t.setTitle((String) body.get("title"));
        t.setCategory((String) body.get("category"));
        t.setAmount(Double.valueOf(body.get("amount").toString()));
        t.setExpense(Boolean.valueOf(body.get("expense").toString()));
        t.setUser(u);
        return ResponseEntity.ok(transactionRepository.save(t));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<String, Object> body, Principal principal) {
        User u = getUser(principal);
        Optional<Transaction> opt = transactionRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        Transaction t = opt.get();
        if (!t.getUser().getId().equals(u.getId())) return ResponseEntity.status(403).build();
        t.setTitle((String) body.get("title"));
        t.setCategory((String) body.get("category"));
        t.setAmount(Double.valueOf(body.get("amount").toString()));
        t.setExpense(Boolean.valueOf(body.get("expense").toString()));
        return ResponseEntity.ok(transactionRepository.save(t));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Principal principal) {
        User u = getUser(principal);
        return transactionRepository.findById(id).map(t -> {
            if (!t.getUser().getId().equals(u.getId())) return ResponseEntity.status(403).build();
            transactionRepository.delete(t);
            return ResponseEntity.ok(Map.of("deleted", true));
        }).orElse(ResponseEntity.notFound().build());
    }
}
