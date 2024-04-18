package com.sms.travelapp.mapper;

import com.sms.travelapp.dto.UserCountryResponseDto;
import com.sms.travelapp.model.UserCountry;
import org.springframework.stereotype.Service;

@Service
public class UserCountryMapper {

    public static UserCountryResponseDto mapToUserCountryResponseDto(UserCountry userCountry){
        return UserCountryResponseDto.builder()
                .id(userCountry.getId())
                .firstVisit(userCountry.getCreatedAt())
                .lastVisit(userCountry.getLastUpdated())
                .count(userCountry.getCount())
                .countryId(userCountry.getCountryId())
                .build();
    }
}
