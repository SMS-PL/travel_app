package com.sms.travelapp.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Cascade;

@Entity
@Data
@Table(name = "post_reaction")
public class PostReaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "type")
    private int reactionType; // 0 - like 1 - heart

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id")
    private UserEntity author;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    private Post post;
}
