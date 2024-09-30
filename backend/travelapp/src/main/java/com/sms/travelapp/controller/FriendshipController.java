package com.sms.travelapp.controller;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.mapper.StringResponseMapper;
import com.sms.travelapp.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/friendship")
@RequiredArgsConstructor
@CrossOrigin("*")
public class FriendshipController {

    private final FriendshipService friendshipService;

    @GetMapping("/{userId}")
    public ResponseEntity<Page<UserResponseDto>> getFriendsOfUser(@PathVariable Long userId, @RequestParam int pageNumber, @RequestParam int pageSize){
        Page<UserResponseDto> friends = friendshipService.getFriendsOfUserPaginated(userId,pageNumber,pageSize);

        return ResponseEntity.status(HttpStatus.OK).body(friends);
    }

    @PostMapping("/{friendId}")
    public ResponseEntity<Map<String,String>> sendFriendRequest(@PathVariable Long friendId){
        String res = friendshipService.sendFriendRequest(friendId);

        return ResponseEntity.status(HttpStatus.OK).body(StringResponseMapper.mapToMap(res));
    }

    @DeleteMapping("/{friendId}")
    public ResponseEntity<Map<String,String>> removeFriend(@PathVariable Long friendId){
        String res = friendshipService.removeFriend(friendId);

        return ResponseEntity.status(HttpStatus.OK).body(StringResponseMapper.mapToMap(res));
    }

    @GetMapping("/status/{friendId}")
    public ResponseEntity<Map<String,String>> getStatusWithGivenUser(@PathVariable Long friendId){
        String res = friendshipService.getStatusWithGivenUser(friendId);

        return ResponseEntity.status(HttpStatus.OK).body(StringResponseMapper.mapToMap(res));
    }

    @GetMapping("/sentRequests")
    public ResponseEntity<List<UserResponseDto>> getSentRequests(){
        List<UserResponseDto> sentRequests = friendshipService.getSentFriendRequest();

        return ResponseEntity.status(HttpStatus.OK).body(sentRequests);
    }

    @GetMapping("/receivedRequests")
    public ResponseEntity<Page<UserResponseDto>> getReceivedRequests(@RequestParam int pageNumber, @RequestParam int pageSize){
        Page<UserResponseDto> receivedRequests = friendshipService.getReceivedFriendRequest(pageNumber,pageSize);

        return ResponseEntity.status(HttpStatus.OK).body(receivedRequests);
    }

}
