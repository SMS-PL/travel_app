package com.sms.travelapp.dto.Country;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class CountryResponseDto {
    private int id;
    private String iso;
    private String nicename;
    private String iso3;
    private String description;
}
