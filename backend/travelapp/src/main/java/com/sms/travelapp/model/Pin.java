package com.sms.travelapp.model;


import com.sms.travelapp.dto.PlaceDetails;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.geo.Point;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "pin")
public class Pin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private UserEntity author;

    @Column(name = "city")
    private String city;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;

    @Column(name="localization")
    private Point localization;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
}
