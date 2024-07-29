package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Country.CountryResponseDto;
import com.sms.travelapp.dto.PlaceDetails;
import com.sms.travelapp.exception.CountryNotFound;
import com.sms.travelapp.mapper.CountryMapper;
import com.sms.travelapp.model.Country;
import com.sms.travelapp.repository.CountryRepository;
import com.sms.travelapp.service.CountryService;
import com.sms.travelapp.service.GeolocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {

    private final CountryRepository countryRepository;

    @Override
    public List<CountryResponseDto> getAllCountries() {
       List<Country> countries =  countryRepository.findAll();
       return countries.stream().map(
               CountryMapper::mapToCountryResponseDto).collect(Collectors.toList());

    }

    @Override
    public CountryResponseDto getCountryById(int id) {
        Country country = countryRepository.findById(id).orElseThrow(
                () -> new CountryNotFound("Country id -" + id + " not found")
        );
        return CountryMapper.mapToCountryResponseDto(country);
    }

    @Override
    public Page<CountryResponseDto> searchForCountry(String queryCountry, int pageNumber, int pageSize) {
        if(queryCountry==null) queryCountry = " ";
        Page<Country> countries;
        if(queryCountry.startsWith("$")){
            queryCountry = queryCountry.substring(1);
            queryCountry = queryCountry.trim();
            queryCountry = queryCountry.toUpperCase();
            countries = countryRepository.findAllByNameStartingWith(queryCountry,
                    PageRequest.of(pageNumber,
                            pageSize,
                            Sort.by("name").ascending()));
        }else{
            queryCountry = queryCountry.trim();
            queryCountry = queryCountry.toUpperCase();
            countries = countryRepository.findByNameContaining(queryCountry,
                    PageRequest.of(pageNumber,
                            pageSize,
                            Sort.by("name").ascending()));
        }


        return new PageImpl<>(
                countries.getContent().stream().map(CountryMapper::mapToCountryResponseDto).collect(Collectors.toList()),
                PageRequest.of(pageNumber,pageSize),
                countries.getTotalElements()
        );
    }

    @Override
    public Country getCountryByIso3(String iso3) {
        return countryRepository.findByIso3(iso3);
    }


}
