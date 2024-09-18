package com.sms.travelapp.mapper;


import com.sms.travelapp.dto.Pin.PinResponseDto;
import com.sms.travelapp.model.Pin;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PinMapper {
    private final UserMapper userMapper;

    public  PinResponseDto mapToPinResponseDto(Pin pin){
        return PinResponseDto.builder()
                .id(pin.getId())
                .localization(pin.getLocalization())
                .countryName(pin.getCountry().getNicename())
                .countryIso3(pin.getCountry().getIso3())
                .countryId(pin.getCountry().getId())
                .city(pin.getCity())
                .createdAt(pin.getCreatedAt())
                .author(userMapper.mapToUserResponseDto(pin.getAuthor()))
                .build();
    }
}
