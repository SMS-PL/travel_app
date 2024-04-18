package com.sms.travelapp.dto.Pin;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.model.Country;
import com.sms.travelapp.model.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.geo.Point;

import java.sql.Timestamp;

@Data
@Builder
public class PinResponseDto {
    private Long id;
    private UserResponseDto author;
    private String city;
    private String countryIso3;
    private int countryId;
    private Point localization;
    private Timestamp createdAt;
}
