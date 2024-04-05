package com.sms.travelapp.service.serviceImpl;


import com.sms.travelapp.dto.Pin.PinRequestDto;
import com.sms.travelapp.dto.Pin.PinResponseDto;
import com.sms.travelapp.mapper.PinMapper;
import com.sms.travelapp.model.Pin;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.PinRepository;
import com.sms.travelapp.service.AuthService;
import com.sms.travelapp.service.PinService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
        System.out.println("elo");
        Pin pin = new Pin();
        System.out.println("elo");
        UserEntity user = authService.getLoggedUser();

        pin.setAuthorId(user.getId());
        pin.setLocalization(pinRequestDto.getLocalization());
        pin.setCountryId(pinRequestDto.getCountryId());
        pinRepository.save(pin);
        return PinMapper.mapToPinResponseDto(pin);
    }
}
