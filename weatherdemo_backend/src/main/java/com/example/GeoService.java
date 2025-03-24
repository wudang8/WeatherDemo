package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class GeoService {

    @Autowired
    private WebClient.Builder webClient;

    public GeoService(WebClient.Builder webClient) {
        this.webClient = webClient;
    }

    public GeoResponse getCityGeo(GeoRequest geoRequest) throws Exception {
        String city = geoRequest.getCity();
        String encodedCity = URLEncoder.encode(city, StandardCharsets.UTF_8);
        String url = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodedCity;

        Geo geo = webClient.build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(Geo.class)
                .block();
        assert geo != null;
        //Search for the city and return the response if found, otherwise null
        for (City loc: geo.getResults()) {
            if (loc.getName().equals(city)) {
                return new GeoResponse(loc.getName(), loc.getLatitude(), loc.getLongitude());
            }
        }
        return null;
    }
}
