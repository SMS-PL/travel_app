package com.sms.travelapp.model;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "description")
    private String content;

    @Column(name = "country_id")
    private Long countryId;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "author_id")
    private Long authorId;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "last_updated")
    private Timestamp lastUpdated;
}
