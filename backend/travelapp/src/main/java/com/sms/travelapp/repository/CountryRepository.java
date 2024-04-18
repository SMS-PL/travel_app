package com.sms.travelapp.repository;

import com.sms.travelapp.model.Country;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CountryRepository extends JpaRepository<Country,Integer> {

    @Query("SELECT c FROM Country c WHERE c.name LIKE %:name% OR c.iso LIKE %:name% OR c.iso3 LIKE %:name%")
    Page<Country> findByNameContaining(@Param("name") String name, Pageable pageable);

    @Query("SELECT c FROM Country c WHERE c.name LIKE :name% ")
    Page<Country> findAllByNameStartingWith(@Param("name") String queryCountry, PageRequest name);

    Country findByIso3(String iso3);
}
