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
public class PinRequestDto {
    private Point localization;
}
