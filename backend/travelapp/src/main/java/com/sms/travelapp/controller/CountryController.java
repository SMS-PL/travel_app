package com.sms.travelapp.controller;


import com.sms.travelapp.dto.Country.CountryResponseDto;
import com.sms.travelapp.service.CountryService;
import com.sms.travelapp.service.GeolocationService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/v1/countries")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CountryController {

    private final CountryService countryService;
    private final GeolocationService geoLocationService;

    @GetMapping("/")
    public ResponseEntity<List<CountryResponseDto>> getAllCountries(){
        List<CountryResponseDto> countries = countryService.getAllCountries();
        return ResponseEntity.status(HttpStatus.OK).body(countries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CountryResponseDto> getCountryById(@PathVariable int id){
        CountryResponseDto country = countryService.getCountryById(id);
        return ResponseEntity.status(HttpStatus.OK).body(country);
    }

    @GetMapping("/search/{queryCountry}")
    public ResponseEntity<Page<CountryResponseDto>> searchForCountries(@PathVariable String queryCountry,
                                                                       @RequestParam int pageNumber, @RequestParam int pageSize){
        Page<CountryResponseDto> res = countryService.searchForCountry(queryCountry,pageNumber,pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/cord/{lat}/{lon}")
    public ResponseEntity<CountryResponseDto> getCountryByCoordinates(@PathVariable double lat, @PathVariable double lon){
        CountryResponseDto country = geoLocationService.getCountryByCoordinates(lat,lon);
        return ResponseEntity.status(HttpStatus.OK).body(country);
    }
}
