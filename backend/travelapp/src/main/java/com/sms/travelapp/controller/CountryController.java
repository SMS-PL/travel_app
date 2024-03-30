package com.sms.travelapp.controller;


import com.sms.travelapp.dto.CountryResponseDto;
import com.sms.travelapp.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/api/v1/countries")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CountryController {

    private final CountryService countryService;

    @GetMapping("/")
    public ResponseEntity<List<CountryResponseDto>> getAllCountries(){
        List<CountryResponseDto>  countries = countryService.getAllCountries();
        return ResponseEntity.status(HttpStatus.OK).body(countries);
    }
}
