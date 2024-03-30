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
    private int id;

    @Column(name="iso")
    private String iso;

    @Column(name="name")
    private String name;

    @Column(name="nicename")
    private String nicename;

    @Column(name = "iso3")
    private String iso3;

    @Column(name = "numcode")
    private int numcode;

    @Column(name="phonecode")
    private int phonecode;

    @Column(name="description")
    private String description;
}
