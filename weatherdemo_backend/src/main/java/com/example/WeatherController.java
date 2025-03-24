package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @PostMapping("/weather")
    public ResponseEntity<?> getLocalWeather(@RequestBody WeatherRequest weatherRequest) {
        System.out.println("TEST");
        try {
            WeatherResponse weatherResponse = weatherService.getWeather(weatherRequest);
            return ResponseEntity.ok(weatherResponse);
        } catch (Exception e) {
            return ResponseEntity.ok("Could not find weather for this location.");
        }
    }
}
