package com.sms.travelapp.model;


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

    @Column(name = "author_id")
    private Long authorId;

    @Column(name = "country_id")
    private int countryId;

    @Column(name="coordinates")
    private Point localization;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
}
