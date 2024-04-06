package com.sms.travelapp.repository;

import com.sms.travelapp.model.Friendship;
import com.sms.travelapp.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendshipRepository extends JpaRepository<Friendship,Long> {

    List<Friendship> findAllByUser(UserEntity user);

    boolean existsByUserAndFriend(UserEntity user, UserEntity friend);

    List<Friendship> findAllByFriend(UserEntity friend);

    Friendship findByUserAndFriend(UserEntity user, UserEntity friend);
}
