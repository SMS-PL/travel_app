package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.PlaceDetails;
import com.sms.travelapp.dto.UserCountryResponseDto;
import com.sms.travelapp.exception.UserNotFound;
import com.sms.travelapp.mapper.UserCountryMapper;
import com.sms.travelapp.model.Country;
import com.sms.travelapp.model.UserCountry;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.UserCountryRepository;
import com.sms.travelapp.repository.UserRepository;
import com.sms.travelapp.service.AuthService;
import com.sms.travelapp.service.UserCountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserCountryServiceImpl implements UserCountryService {

    private final UserCountryRepository userCountryRepository;
    private final AuthService authService;
    private final UserRepository userRepository;

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

    @Override
    public Page<UserCountryResponseDto> getUserVisitedCountries(Long userId, int pageSize, int pageNumber) {
        Page<UserCountry> userCountries = userCountryRepository
                                                .findAllByUserId(userId, PageRequest.of(pageNumber, pageSize));

        return new PageImpl<>(
                userCountries
                        .stream()
                        .map(UserCountryMapper::mapToUserCountryResponseDto)
                        .collect(Collectors.toList()),
                PageRequest.of(pageNumber, pageSize),
                userCountries.getTotalElements()
                );

    }
}
