package com.example.app.record;

import java.util.UUID;

public record AuthRecord(UUID id, String hashedPassword) {
}
