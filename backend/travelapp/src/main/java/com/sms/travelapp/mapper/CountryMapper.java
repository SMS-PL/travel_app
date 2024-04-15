package com.sms.travelapp.mapper;

import com.sms.travelapp.dto.Country.CountryResponseDto;
import com.sms.travelapp.model.Country;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CountryMapper {

    public static CountryResponseDto mapToCountryResponseDto(Country country) {
        return CountryResponseDto.builder()
                .id(country.getId())
                .description(
                        country.getDescription()==null
                                ? " " : country.getDescription())
                .iso(country.getIso())
                .iso3(country.getIso3())
                .nicename(country.getNicename())
                .build();
    }
}
