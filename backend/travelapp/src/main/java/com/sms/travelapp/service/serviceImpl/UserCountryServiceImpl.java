package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.PlaceDetails;
import com.sms.travelapp.model.Country;
import com.sms.travelapp.model.UserCountry;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.UserCountryRepository;
import com.sms.travelapp.service.AuthService;
import com.sms.travelapp.service.UserCountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
public class UserCountryServiceImpl implements UserCountryService {

    private final UserCountryRepository userCountryRepository;
    private final AuthService authService;

    @Override
    public void updateStats(PlaceDetails placeDetails) {
        UserEntity user = authService.getLoggedUser();

        Country country = placeDetails.getCountry();

        if(userCountryRepository.existsByUserIdAndCountryIdAndCountNotNull(user.getId(),country.getId())){
            UserCountry userCountry = userCountryRepository
                                            .findByUserIdAndCountryIdAndCountNotNull(user.getId(),country.getId());

            LocalDateTime today = LocalDateTime.now();
            LocalDateTime thresholdDate = today.minusDays(21);
            LocalDateTime lastUpdated = userCountry.getLastUpdated().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

            if(!lastUpdated.isAfter(thresholdDate)){
                userCountry.setCount(userCountry.getCount()+1);
                userCountryRepository.save(userCountry);
            }


        }else{
            UserCountry userCountry = new UserCountry();
            userCountry.setCountryId(country.getId());
            userCountry.setUserId(user.getId());
            userCountry.setCount(1);
            userCountryRepository.save(userCountry);
        }


        //TODO: Checking for available achievements
    }
}
