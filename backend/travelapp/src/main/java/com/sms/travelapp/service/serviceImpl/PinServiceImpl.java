package com.sms.travelapp.service.serviceImpl;


import com.sms.travelapp.dto.Pin.PinRequestDto;
import com.sms.travelapp.dto.Pin.PinResponseDto;
import com.sms.travelapp.exception.AccessDenied;
import com.sms.travelapp.exception.PinNotFound;
import com.sms.travelapp.mapper.PinMapper;
import com.sms.travelapp.model.Pin;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.PinRepository;
import com.sms.travelapp.service.AuthService;
import com.sms.travelapp.service.PinService;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PinServiceImpl implements PinService {

    private final PinRepository pinRepository;
    private final AuthService authService;
    @Override
    public List<PinResponseDto> getAllPins() {
        return pinRepository.findAll().stream().map(
                PinMapper::mapToPinResponseDto
        ).collect(Collectors.toList());
    }

    @Override
    public PinResponseDto createPin(PinRequestDto pinRequestDto) {
        Pin pin = new Pin();
        UserEntity user = authService.getLoggedUser();

        pin.setAuthorId(user.getId());
        pin.setLocalization(pinRequestDto.getLocalization());
        pin.setCountryId(pinRequestDto.getCountryId());
        pinRepository.save(pin);
        return PinMapper.mapToPinResponseDto(pin);
    }

    @Override
    public String deletePin(Long pinId) {
        UserEntity user = authService.getLoggedUser();
        Pin pin = pinRepository.findById(pinId).orElseThrow(
                ()-> new PinNotFound("Pin not found!")
        );
        if(!user.getId().equals(pin.getAuthorId())){
            throw new AccessDenied("You are not authorized to delete this pin!");
        }
        pinRepository.delete(pin);
        return "Removed pin id-"+pinId;
    }
}
