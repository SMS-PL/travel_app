package com.sms.travelapp.controller;


import com.sms.travelapp.dto.Pin.PinRequestDto;
import com.sms.travelapp.dto.Pin.PinResponseDto;
import com.sms.travelapp.mapper.StringResponseMapper;
import com.sms.travelapp.service.GeolocationService;
import com.sms.travelapp.service.PinService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/pins")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PinController {

    private final PinService pinService;


    @GetMapping("/")
    public ResponseEntity<Page<PinResponseDto>> getAllPins(@RequestParam int pageNumber, @RequestParam int pageSize){
        Page<PinResponseDto> res = pinService.getAllPins(pageNumber,pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    //@GetMapping("/")

    @PostMapping("/")
    public ResponseEntity<PinResponseDto> createPin(@RequestBody PinRequestDto pinRequestDto){
       PinResponseDto res = pinService.createPin(pinRequestDto);
       return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @DeleteMapping("/{pinId}")
    public ResponseEntity<Map<String,String>> deletePin(@PathVariable Long pinId){
        String res = pinService.deletePin(pinId);
        return ResponseEntity.status(HttpStatus.OK).body(StringResponseMapper.mapToMap(res));
    }

    @GetMapping("/friends")
    public ResponseEntity<Page<Map.Entry<Long, List<PinResponseDto>>>> getFriendsPins(@RequestParam int pageNumber, @RequestParam int pageSize){
        Page<Map.Entry<Long, List<PinResponseDto>>> pins = pinService.getActiveFriendsPins(pageNumber,pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(pins);
    }

    @GetMapping("my/active")
    public ResponseEntity<List<PinResponseDto>> getMyActivePins(){
        List<PinResponseDto> pins = pinService.getMyActivePins();
        return ResponseEntity.status(HttpStatus.OK).body(pins);
    }
}
