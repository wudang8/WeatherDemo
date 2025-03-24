package com.example;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public ResponseEntity<?> adminDashboard(Principal principal) {
        String username = principal.getName();
        username = username.substring(0, username.indexOf('@'));
        String message = "Hello ADMIN " + username + "!";
        return ResponseEntity.ok(message);
    }
}
