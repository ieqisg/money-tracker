package com.example.app.controller;

import java.util.UUID;
import java.time.LocalDate;
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
import com.example.app.enums.TransactionTypeEnum;
import com.example.app.record.CategoryTotalRecord;
import com.example.app.record.SummaryRecord;
import com.example.app.record.TransactionRecord;
import com.example.app.service.TransactionService;

import jakarta.validation.Valid;

@RestController
public class TransactionController {

  @Autowired
  private TransactionService transactionService;

  @GetMapping("/api/transaction")
  public ResponseEntity<List<TransactionRecord>> getTransaction(Authentication authentication,
      @RequestParam(required = true) int year,
      @RequestParam(required = true) int month,
      @RequestParam(defaultValue = "10") int limit,
      @RequestParam(defaultValue = "0") int offset) {

    UUID userId = UUID.fromString(authentication.getName());
    List<TransactionRecord> transaction = transactionService.getTransaction(userId, year, month, Math.min(limit, 100),
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

  @GetMapping("/api/summary")
  public ResponseEntity<SummaryRecord> getSummary(
      Authentication authentication,
      @RequestParam(required = true) Integer year,
      @RequestParam(required = true) Integer month) {

    UUID userId = UUID.fromString(authentication.getName());

    if (month < 1 || month > 12) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(transactionService.getSummary(userId, year, month));
  }

  @GetMapping("/api/breakdown")
  public ResponseEntity<List<CategoryTotalRecord>> breakdown(
      Authentication authentication,
      @RequestParam TransactionTypeEnum type,
      @RequestParam(required = true) int year,
      @RequestParam(required = true) int month) {

    UUID userId = UUID.fromString(authentication.getName());

    if (month < 1 || month > 12) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(transactionService.getCategoryBreakdown(userId, type, year, month));
  }
}
