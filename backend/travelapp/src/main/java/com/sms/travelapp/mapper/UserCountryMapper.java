package com.sms.travelapp.mapper;

import com.sms.travelapp.dto.UserCountryResponseDto;
import com.sms.travelapp.model.UserCountry;
import com.sms.travelapp.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCountryMapper {

    private final CountryService countryService;

    public  UserCountryResponseDto mapToUserCountryResponseDto(UserCountry userCountry){


        return UserCountryResponseDto.builder()
                .id(userCountry.getId())
                .firstVisit(userCountry.getCreatedAt())
                .lastVisit(userCountry.getLastUpdated())
                .count(userCountry.getCount())
                .country(countryService.getCountryById(userCountry.getCountryId()))
                .build();
    }
}
