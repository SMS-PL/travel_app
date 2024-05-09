package com.sms.travelapp.service;

import com.sms.travelapp.dto.Pin.PinRequestDto;
import com.sms.travelapp.dto.Pin.PinResponseDto;
import com.sms.travelapp.model.Pin;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PinService {

    public Page<PinResponseDto> getAllPins(int pageNumber,int pageSize);
    PinResponseDto createPin(PinRequestDto pinRequestDto);
    String deletePin(Long pinId);

    Page<PinResponseDto> getActiveFriendsPins(int pageNumber, int pageSize);
}
