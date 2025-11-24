package com.example.demo.service;

import com.example.demo.model.Transaction;
import com.example.demo.model.User;
import com.example.demo.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public List<Transaction> getUserTransactions(User user) {
        return transactionRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Transaction createTransaction(Map<String, Object> body, User user) {
        Transaction t = new Transaction();
        t.setTitle((String) body.get("title"));
        t.setCategory((String) body.get("category"));
        t.setAmount(Double.valueOf(body.get("amount").toString()));
        t.setExpense(Boolean.valueOf(body.get("expense").toString()));
        t.setUser(user);
        return transactionRepository.save(t);
    }

    public Transaction updateTransaction(Transaction t, Map<String, Object> body) {
        t.setTitle((String) body.get("title"));
        t.setCategory((String) body.get("category"));
        t.setAmount(Double.valueOf(body.get("amount").toString()));
        t.setExpense(Boolean.valueOf(body.get("expense").toString()));
        return transactionRepository.save(t);
    }

    public void delete(Transaction t) {
        transactionRepository.delete(t);
    }
}
