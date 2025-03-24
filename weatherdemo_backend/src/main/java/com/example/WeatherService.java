package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Service
public class WeatherService {

    @Autowired
    private WebClient.Builder webClient;
    @Autowired
    private GeoService geoService;

    public WeatherService(WebClient.Builder webClient) {
        this.webClient = webClient;
    }

    public WeatherResponse getWeather(WeatherRequest weatherRequest) throws Exception{
        Double lat = weatherRequest.getLatitude();
        Double lon = weatherRequest.getLongitude();
        String url = "https://api.open-meteo.com/v1/forecast?" +
                "<longitude>&" +
                "<latitude>&" +
                "current=temperature_2m,relativehumidity_2m,precipitation_probability";

        url = url.replace("<longitude>", "longitude=" + String.valueOf(lon));
        url = url.replace("<latitude>", "latitude=" + String.valueOf(lat));

        Weather weather =  webClient.build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(Weather.class)
                .block();
        WeatherResponse resp = weather.getCurrent();
        if (resp != null) {
            return resp;
        }
        return null;

    }

//    public Double getTemp(String city) {
//        String url = "https://api.open-meteo.com/v1/forecast?<longitude>&<latitude>&current=temperature";
//        Map<String, Double> map = new HashMap<>();
//        try {
//            map = geoService.getGeo(city);
//        } catch (Exception e) {
//            System.out.println("ERROR" + e.getMessage());
//            return null;
//        }
//
//        Double longitude = map.get("long");
//        Double latitude = map.get("lat");
//
//        url = url.replace("<longitude>", "longitude=" + String.valueOf(longitude));
//        url = url.replace("<latitude>", "latitude=" + String.valueOf(latitude));
//        System.out.println(url);
//
//        Weather weather =  webClient.build()
//                .get()
//                .uri(url)
//                .retrieve()
//                .bodyToMono(Weather.class)
//                .block();
//        Temperature temp = weather.getCurrent();
//        if (temp != null) {
//            return temp.getTemperature();
//        }
//        return null;
//    }
}
