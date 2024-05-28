package com.sms.travelapp.service.serviceImpl;


import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.dto.Pin.PinRequestDto;
import com.sms.travelapp.dto.Pin.PinResponseDto;
import com.sms.travelapp.dto.PlaceDetails;
import com.sms.travelapp.exception.AccessDenied;
import com.sms.travelapp.exception.PinNotFound;
import com.sms.travelapp.exception.PlaceNotFound;
import com.sms.travelapp.mapper.CommentMapper;
import com.sms.travelapp.mapper.PinMapper;
import com.sms.travelapp.model.Pin;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.PinRepository;
import com.sms.travelapp.service.*;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import java.util.LinkedHashMap;


import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PinServiceImpl implements PinService {

    private final PinRepository pinRepository;
    private final AuthService authService;
    private final GeolocationService geolocationService;
    private final UserService userService;
    private final UserCountryService userCountryService;
    @Override
    public Page<PinResponseDto> getAllPins(int pageNumber,int pageSize) {
        Page<Pin> pins =  pinRepository.findAll(PageRequest.of(pageNumber,
                pageSize,
                Sort.by("createdAt").descending()));

        return new PageImpl<>(
                pins.getContent().stream().map(PinMapper::mapToPinResponseDto).collect(Collectors.toList()),
                PageRequest.of(pageNumber,pageSize),
                pins.getTotalElements());

    }

    @Override
    public PinResponseDto createPin(PinRequestDto pinRequestDto) {

        UserEntity user = authService.getLoggedUser();
        PlaceDetails placeDetails;

        try {
            placeDetails = geolocationService.getInfo(pinRequestDto.getLocalization());
        }catch (Exception e){
            throw new PlaceNotFound("Place not found!");
        }

        userCountryService.updateStats(placeDetails);

        Pin pin = new Pin();
        pin.setAuthor(user);
        pin.setLocalization(pinRequestDto.getLocalization());
        pin.setCity(placeDetails.getCity());
        pin.setCountry(placeDetails.getCountry());
        pin.setLocalization(pinRequestDto.getLocalization());
        pinRepository.save(pin);
        return PinMapper.mapToPinResponseDto(pin);
    }

    @Override
    public String deletePin(Long pinId) {
        UserEntity user = authService.getLoggedUser();
        Pin pin = pinRepository.findById(pinId).orElseThrow(
                ()-> new PinNotFound("Pin not found!")
        );
        if(!user.getId().equals(pin.getAuthor().getId())){
            throw new AccessDenied("You are not authorized to delete this pin!");
        }
        pinRepository.delete(pin);
        return "Removed pin id-"+pinId;
    }


//PRZETESTOWAC I PUSHNAC

    @Override
    public Page<Map.Entry<Long, List<PinResponseDto>>> getActiveFriendsPins(int pageNumber, int pageSize) {
        List<Long> friendsIds = userService.getFriendList().stream().map(UserResponseDto::getId).toList();
        ZonedDateTime cutoff = ZonedDateTime.now().minusHours(24);
        Timestamp timestampCutoff = Timestamp.from(cutoff.toInstant());

        List<Pin> pins = pinRepository.findAllByAuthorIds(friendsIds, timestampCutoff);

        Map<Long, List<PinResponseDto>> groupedPins = pins.stream()
                .collect(Collectors.groupingBy(
                        pin -> pin.getAuthor().getId(),
                        LinkedHashMap::new,
                        Collectors.mapping(PinMapper::mapToPinResponseDto, Collectors.toList())
                ));

        List<Map.Entry<Long, List<PinResponseDto>>> entries = new ArrayList<>(groupedPins.entrySet());
        int start = pageNumber * pageSize;
        int end = Math.min(start + pageSize, entries.size());

        Page<Map.Entry<Long, List<PinResponseDto>>> page = new PageImpl<>(
                entries.subList(start, end),
                PageRequest.of(pageNumber, pageSize),
                entries.size()
        );

        return page;
    }
}
