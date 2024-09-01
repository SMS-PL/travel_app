package com.sms.travelapp.repository;

import com.sms.travelapp.model.Friendship;
import com.sms.travelapp.model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendshipRepository extends JpaRepository<Friendship,Long> {


    List<Friendship> findAllByUser(UserEntity user);
    @Query("SELECT f FROM Friendship f WHERE f.user = :user AND " +
            "EXISTS (SELECT 1 FROM Friendship f2 WHERE f2.user = f.friend AND f2.friend = :user)")
    Page<Friendship> findAllByUser(@Param("user") UserEntity user, Pageable pageable);

    boolean existsByUserAndFriend(UserEntity user, UserEntity friend);

    List<Friendship> findAllByFriend(UserEntity friend);

    Friendship findByUserAndFriend(UserEntity user, UserEntity friend);
}
