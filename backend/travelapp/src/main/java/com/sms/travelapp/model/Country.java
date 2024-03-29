package com.sms.travelapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "country")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="coordinates") // coordinates of capital city
    private String coordinates;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;
}
