package com.example;

public class Weather {
    private WeatherResponse current;

    public WeatherResponse getCurrent() {
        return current;
    }

    public void setCurrent(WeatherResponse current) {
        this.current = current;
    }
}
