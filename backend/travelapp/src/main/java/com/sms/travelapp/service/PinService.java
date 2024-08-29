package com.sms.travelapp.service;

import com.sms.travelapp.dto.Pin.PinRequestDto;
import com.sms.travelapp.dto.Pin.PinResponseDto;
import com.sms.travelapp.model.Pin;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface PinService {

    public Page<PinResponseDto> getAllPins(int pageNumber,int pageSize);
    PinResponseDto createPin(PinRequestDto pinRequestDto);
    String deletePin(Long pinId);

    Page<Map.Entry<Long, List<PinResponseDto>>> getActiveFriendsPins(int pageNumber, int pageSize);

    List<PinResponseDto> getMyActivePins();

    Page<PinResponseDto> getAllUserPins(Long userId, int pageNumber, int pageSize);
}
