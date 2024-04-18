package com.sms.travelapp.service;

import com.sms.travelapp.dto.PlaceDetails;
import com.sms.travelapp.dto.UserCountryResponseDto;
import org.springframework.data.domain.Page;

public interface UserCountryService {
    void updateStats(PlaceDetails placeDetails);

    Page<UserCountryResponseDto> getUserVisitedCountries(Long userId, int pageSize, int pageNumber);
}
