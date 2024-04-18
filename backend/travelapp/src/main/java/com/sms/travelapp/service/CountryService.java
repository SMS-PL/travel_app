package com.sms.travelapp.service;

import com.sms.travelapp.dto.Country.CountryResponseDto;
import com.sms.travelapp.model.Country;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CountryService {
    List<CountryResponseDto> getAllCountries();

    CountryResponseDto getCountryById(int id);

    Page<CountryResponseDto> searchForCountry(String queryCountry, int pageNumber, int pageSize);

    Country getCountryByIso3(String iso3);
}
