package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Achievement.AchievementResponseDto;
import com.sms.travelapp.exception.CountryNotFound;
import com.sms.travelapp.mapper.AchievementMapper;
import com.sms.travelapp.model.*;
import com.sms.travelapp.repository.AchievementRepository;
import com.sms.travelapp.repository.CountryRepository;
import com.sms.travelapp.repository.UserAchievementRepository;
import com.sms.travelapp.service.AchievementService;
import com.sms.travelapp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AchievementServiceImpl implements AchievementService {

    private final AchievementRepository achievementRepository;
    private final CountryRepository countryRepository;
    private final AuthService authService;
    private final UserAchievementRepository userAchievementRepository;

    @Override
    public void checkForNewAchievements(UserCountry userCountry) {
        if(Arrays.asList(1,3,5,7,10).contains(userCountry.getCount())){
            UserEntity user = authService.getLoggedUser();

            UserAchievement userAchievement = new UserAchievement();
            Achievement achievement;
            switch (userCountry.getCount()){
                case 1:
                    achievement = getAchievement(userCountry,0);
                    break;
                case 3:
                    achievement = getAchievement(userCountry,1);
                    break;
                case 5:
                    achievement = getAchievement(userCountry,2);
                    break;
                case 7:
                    achievement = getAchievement(userCountry,3);
                    break;
                case 10:
                    achievement = getAchievement(userCountry,4);
                    break;
                default:
                    achievement = null;
            }


            userAchievement.setAchievementId(achievement.getId());
            userAchievement.setUserId(user.getId());
            userAchievement.setUserOrder(achievement.getUserCount());

            userAchievementRepository.save(userAchievement);
        }

    }

    @Override
    public Page<AchievementResponseDto> getAllAchievementsByLevel(int level, int pageSize, int pageNumber) {
       Page<Achievement> achievements =  achievementRepository.findAllByLevel(level, PageRequest.of(pageNumber, pageSize));

       return new PageImpl<>(
               achievements
                       .stream()
                       .map(AchievementMapper::mapToAchievementResponseDto).collect(Collectors.toList()),
               PageRequest.of(pageNumber,pageSize),
               achievements.getTotalElements()
               );
    }


    private Achievement getAchievement(UserCountry userCountry,int level){
        Achievement achievement = achievementRepository.findByCountry_IdAndLevel(userCountry.getCountryId(), level);
        if(achievement==null){
            achievement = new Achievement();
            Country country = countryRepository.findById(userCountry.getCountryId()).orElseThrow(
                    ()-> new CountryNotFound("Country not found!")
            );
            achievement.setCountry(country);
            if(level==0){
                achievement.setDescription("Visit "+country.getNicename()+" 1st time!");
                achievement.setTitle("Welcome to "+ country.getName()+"!");
                achievement.setLevel(0);
                achievement.setType(0);
            }else if(level==1){
                achievement.setDescription("Visit "+country.getNicename()+" 3rd time!");
                achievement.setTitle("Welcome again to "+ country.getName()+"!");
                achievement.setLevel(1);
                achievement.setType(0);
            }else if(level==2){
                achievement.setDescription("Visit "+country.getNicename()+" 5th time!");
                achievement.setTitle("You must love "+ country.getName()+"!");
                achievement.setLevel(2);
                achievement.setType(0);
            }else if(level==3){
                achievement.setDescription("Visit "+country.getNicename()+" 7th time!");
                achievement.setTitle("You are obsessed with "+ country.getName()+"!");
                achievement.setLevel(3);
                achievement.setType(0);
            }
            else if(level==4){
                achievement.setDescription("Visit "+country.getNicename()+" 10th time!");
                achievement.setTitle("Your second home: "+ country.getName()+"!");
                achievement.setLevel(4);
                achievement.setType(0);
            }
            achievement.setUserCount(1L);


            achievementRepository.save(achievement);

        }else{
            achievement.setUserCount(achievement.getUserCount()+1);
            achievementRepository.save(achievement);
        }
        return achievement;
    }
}
