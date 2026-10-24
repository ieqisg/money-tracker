package com.example.app.controller;

import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.dto.TransactionDto;
import com.example.app.record.TransactionRecord;
import com.example.app.service.TransactionService;

import jakarta.validation.Valid;

@RestController
public class TransactionController {

  @Autowired
  private TransactionService transactionService;

  @GetMapping("/api/transaction")
  public ResponseEntity<List<TransactionRecord>> getTransaction(Authentication authentication,
      @RequestParam(defaultValue = "10") int limit,
      @RequestParam(defaultValue = "0") int offset) {

    UUID userId = UUID.fromString(authentication.getName());
    List<TransactionRecord> transaction = transactionService.getTransaction(userId, Math.min(limit, 100),
        Math.max(offset, 0));
    return ResponseEntity.ok(transaction);

  }

  @PostMapping("/api/transaction")
  public ResponseEntity<String> addTransaction(@Valid @RequestBody TransactionDto transactionDto,
      Authentication authentication) {
    UUID userId = UUID.fromString(authentication.getName());

    TransactionRecord transaction = new TransactionRecord(
        transactionDto.getTransactionType(),
        transactionDto.getCategory(),
        transactionDto.getAmount(),
        transactionDto.getDescription(),
        transactionDto.getDate(),
        transactionDto.getTime());
    transactionService.addTransaction(userId, transaction);
    return ResponseEntity.status(HttpStatus.CREATED).build();

  }

}
