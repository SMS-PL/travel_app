package com.sms.travelapp.repository;

import com.sms.travelapp.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AchievementRepository extends JpaRepository<Achievement,Long> {

    Achievement findByCountry_IdAndLevel(int countryId, int level);
}
