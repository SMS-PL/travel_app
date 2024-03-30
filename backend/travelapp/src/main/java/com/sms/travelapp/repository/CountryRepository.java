package com.sms.travelapp.repository;

import com.sms.travelapp.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country,Integer> {
}
