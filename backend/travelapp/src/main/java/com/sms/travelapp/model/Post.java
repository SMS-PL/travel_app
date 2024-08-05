package com.sms.travelapp.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "post")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Lob
    @Column(name = "description")
    private String content;


    @Column(name = "country_id")
    private Long countryId;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "author_id")
    private Long authorId = -1L;

    @Column(name = "like_count")
    private Long likeCount;

    @Column(name = "heart_count")
    private Long heartCount;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "last_updated")
    private Timestamp lastUpdated;
}
