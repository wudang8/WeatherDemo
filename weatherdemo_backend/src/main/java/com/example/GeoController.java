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
public class GeoController {

    @Autowired
    private GeoService geoService;

    @PostMapping("/city")
    public ResponseEntity<?> getCityGeo(@RequestBody GeoRequest geoRequest) {
        try {
            GeoResponse geoResponse = (GeoResponse) geoService.getCityGeo(geoRequest);
            return ResponseEntity.ok(geoResponse);
        } catch (Exception e) {
            return ResponseEntity.ok("Could not find coordinates for this location.");
        }
    }
}
