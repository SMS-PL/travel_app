package com.sms.travelapp.controller;


import com.sms.travelapp.dto.Pin.PinRequestDto;
import com.sms.travelapp.dto.Pin.PinResponseDto;
import com.sms.travelapp.mapper.StringResponseMapper;
import com.sms.travelapp.service.PinService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<List<PinResponseDto>> getAllPins(){
        List<PinResponseDto> res = pinService.getAllPins();
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/") ResponseEntity<PinResponseDto> createPin(@RequestBody PinRequestDto pinRequestDto){
       PinResponseDto res = pinService.createPin(pinRequestDto);
       return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @DeleteMapping("/{pinId}") ResponseEntity<Map<String,String>> deletePin(@PathVariable Long pinId){
        String res = pinService.deletePin(pinId);
        return ResponseEntity.status(HttpStatus.OK).body(StringResponseMapper.mapToMap(res));
    }
}
