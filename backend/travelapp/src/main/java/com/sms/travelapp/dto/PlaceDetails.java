package com.sms.travelapp.dto;

import com.sms.travelapp.dto.Country.CountryResponseDto;
import com.sms.travelapp.model.Country;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlaceDetails {

    private String city;
    private Country country;
    private String continent;
    private String iso3;
}
