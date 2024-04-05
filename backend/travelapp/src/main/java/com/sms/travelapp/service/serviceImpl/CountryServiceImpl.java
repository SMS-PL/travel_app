package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Country.CountryResponseDto;
import com.sms.travelapp.exception.CountryNotFound;
import com.sms.travelapp.mapper.CountryMapper;
import com.sms.travelapp.model.Country;
import com.sms.travelapp.repository.CountryRepository;
import com.sms.travelapp.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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
}
