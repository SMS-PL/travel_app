package com.sms.travelapp.controller;


import com.sms.travelapp.dto.UserCountryResponseDto;
import com.sms.travelapp.service.UserCountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/visited-countries")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserCountryController {

    private final UserCountryService userCountryService;

    @GetMapping("/{userId}")
    public ResponseEntity<Page<UserCountryResponseDto>> getUserVisitedCountries(@PathVariable Long userId,
                                                                                @RequestParam int pageSize,
                                                                                @RequestParam int pageNumber){
        Page<UserCountryResponseDto> res = userCountryService.getUserVisitedCountries(userId,pageSize,pageNumber);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
