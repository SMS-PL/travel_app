package com.sms.travelapp.dto.Pin;

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
    private Long authorId;
    private int countryId;
    private Point localization;
    private Timestamp createdAt;
}
