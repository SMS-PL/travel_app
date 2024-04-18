package com.sms.travelapp.repository;

import com.sms.travelapp.model.UserCountry;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCountryRepository extends JpaRepository<UserCountry,Long> {

    boolean existsByUserIdAndCountryIdAndCountNotNull(Long userId, int countryId);
    UserCountry findByUserIdAndCountryIdAndCountNotNull(Long userId, int countryId);

    Page<UserCountry> findAllByUserId(Long userId, Pageable pageable);
}
