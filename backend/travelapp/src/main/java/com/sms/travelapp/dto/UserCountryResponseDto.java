package com.sms.travelapp.dto;

import com.sms.travelapp.dto.Country.CountryResponseDto;
import com.sms.travelapp.model.Country;
import com.sms.travelapp.model.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Time;
import java.sql.Timestamp;

@Data
@Builder
public class UserCountryResponseDto {
    private Long id;
    private CountryResponseDto country;
    private int count;
    private Timestamp lastVisit;
    private Timestamp firstVisit;
}
