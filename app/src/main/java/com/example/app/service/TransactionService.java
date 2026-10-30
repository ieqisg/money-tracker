package com.example.app.service;

import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.enums.TransactionTypeEnum;
import com.example.app.model.TransactionRepository;
import com.example.app.record.CategoryTotalRecord;
import com.example.app.record.SummaryRecord;
import com.example.app.record.TransactionRecord;

@Service
public class TransactionService {
  @Autowired
  private TransactionRepository transactionRepository;

  public void addTransaction(UUID userId, TransactionRecord transaction) {
    transactionRepository.addTransaction(userId, transaction);
  }

  public List<TransactionRecord> getTransaction(UUID userId, int year, int month, int limit, int offset) {
    return transactionRepository.getTransaction(userId, year, month, limit, offset);
  }

  public SummaryRecord getSummary(UUID userId, int year, int month) {
    return transactionRepository.getSummary(userId, year, month);
  }

  public List<CategoryTotalRecord> getCategoryBreakdown(UUID userId, TransactionTypeEnum type, int year, int month) {
    return transactionRepository.getCategoryBreakdown(userId, type, year, month);
  }
}
