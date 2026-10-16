package com.example.app.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.dto.TransactionDto;
import com.example.app.record.TransactionRecord;
import com.example.app.service.TransactionService;

import jakarta.validation.Valid;

@RestController
public class TransactionController {

  @Autowired
  private TransactionService transactionService;

  @PostMapping("/api/transaction")
  public ResponseEntity<TransactionDto> addTransaction(@Valid @RequestBody TransactionDto transactionDto,
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
    return new ResponseEntity<>(transactionDto, HttpStatus.CREATED);

  }

}
