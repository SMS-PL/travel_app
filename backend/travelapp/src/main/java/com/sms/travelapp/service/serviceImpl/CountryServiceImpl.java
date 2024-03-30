package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.CountryResponseDto;
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
}
