package com.sms.travelapp.service;

import com.sms.travelapp.dto.CountryResponseDto;

import java.util.List;

public interface CountryService {
    List<CountryResponseDto> getAllCountries();

    CountryResponseDto getCountryById(int id);
}
