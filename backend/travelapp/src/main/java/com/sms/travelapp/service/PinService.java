package com.sms.travelapp.service;

import com.sms.travelapp.dto.Pin.PinRequestDto;
import com.sms.travelapp.dto.Pin.PinResponseDto;

import java.util.List;

public interface PinService {

    List<PinResponseDto> getAllPins();

    PinResponseDto createPin(PinRequestDto pinRequestDto);

    String deletePin(Long pinId);
}
