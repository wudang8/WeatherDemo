package com.example;

import com.example.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;

    @Value("${jwt.expiration.refresh.ms}")
    long jwtRefreshExpiration;

    @PostMapping("/auth/signup")
    public ResponseEntity<String> userSignup(@RequestBody SignupRequest signupRequest) {
        try {
            userService.registerUser(signupRequest);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginRequest loginRequest, HttpServletResponse response) throws Exception{
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password.", e);
        }
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(loginRequest.getEmail());

        String role = userDetails.getAuthorities()
                .stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("ROLE_USER");
        System.out.println("ROLE " + role);
        final String jwtAccessToken = jwtUtil.generateAccessToken(userDetails);
        final String jwtRefreshToken = jwtUtil.generateRefreshToken(userDetails);

        //Set Refresh Token as HttpOnly cookie
        ResponseCookie cookie = ResponseCookie.from("refreshToken", jwtRefreshToken)
                .httpOnly(true)
                .secure(true) // Need to be true if using sameSite as none
                .path("/")
                .maxAge(jwtRefreshExpiration)
                .sameSite("None")  // This is very important when setting up on different domains!!!
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(new JwtResponse(jwtAccessToken, null, role));
    }

    @PostMapping("/auth/refresh-token")
    public ResponseEntity<?> refreshToken(@CookieValue(name = "refreshToken", required = false) String refreshToken) {
        System.out.println("Received refresh token: " + refreshToken);
        if (refreshToken == null || refreshToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token is empty.");
        }

        boolean isValid = jwtUtil.validateJwtToken(refreshToken);
        System.out.println("Is valid: " + isValid);
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token is invalid.");
        }

        String username = jwtUtil.getUsernameFromJwt(refreshToken);
        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        String role = userDetails.getAuthorities()
                .stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("ROLE_USER");
        String newAccessToken = jwtUtil.generateAccessToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(newAccessToken, null, role));
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<?> userLogout(HttpServletResponse response) {
        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("None")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/user/dashboard")
    public ResponseEntity<?> userDashboard(Principal principal) {
        String username = principal.getName();
        username = username.substring(0, username.indexOf('@'));
        String message = "Hello user " + username + "!";
        return ResponseEntity.ok(message);
    }

}
