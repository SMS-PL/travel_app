package com.sms.travelapp.controller;


import com.sms.travelapp.dto.Country.CountryResponseDto;
import com.sms.travelapp.service.CountryService;
import lombok.RequiredArgsConstructor;
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
}
