package com.sms.travelapp.repository;

import com.sms.travelapp.model.Achievement;
import com.sms.travelapp.model.UserAchievement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserAchievementRepository extends JpaRepository<UserAchievement,Long> {

    Page<UserAchievement> findAllByUserId(Long userId, PageRequest pg);

}
