package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.dto.User.UserRequestPayload;
import com.sms.travelapp.exception.UserNotFound;
import com.sms.travelapp.mapper.UserMapper;
import com.sms.travelapp.model.Friendship;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.CountryRepository;
import com.sms.travelapp.repository.FriendshipRepository;
import com.sms.travelapp.repository.UserCountryRepository;
import com.sms.travelapp.repository.UserRepository;
import com.sms.travelapp.service.AuthService;
import com.sms.travelapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AuthService authService;
    private final FriendshipRepository friendshipRepository;
    private final UserMapper userMapper;


    @Override
    public Long getUserId() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(username).orElse(null);
        return user.getId();
    }

    @Override
    public UserEntity getUserById(Long userId) {
        UserEntity user = userRepository.findById(userId).orElse(null);
        if(user == null){
            throw new UserNotFound("User Not found!");
        }
        return user;
    }

    @Override
    public UserResponseDto getUserProfileById(Long userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(
                ()-> new UserNotFound("User Not found!")
        );
        if(user.getIsBanned()){
            throw new UserNotFound("User is banned!");
        }

        UserResponseDto userResponseDto = userMapper.mapToUserResponseDto(user);
        UserEntity loggedUser = authService.getLoggedUser();
        if(friendshipRepository.existsByUserAndFriend(loggedUser,user)
                && friendshipRepository.existsByUserAndFriend(user,loggedUser)){
            userResponseDto.setFriendStatus("FRIEND");
        }else if(friendshipRepository.existsByUserAndFriend(loggedUser,user)
                && !friendshipRepository.existsByUserAndFriend(user,loggedUser)){
            userResponseDto.setFriendStatus("SENT");
        }else if(!friendshipRepository.existsByUserAndFriend(loggedUser,user)
                && friendshipRepository.existsByUserAndFriend(user,loggedUser)){
            userResponseDto.setFriendStatus("RECEIVED");
        }else{
            userResponseDto.setFriendStatus("STRANGER");
        }

        return userResponseDto;
    }

    @Override
    public Boolean checkUsernameAvailability(String username) {
        return !userRepository.existsByUsername(username);
    }

    @Override
    public Boolean checkEmailAvailability(String email) {
        return !userRepository.existsByEmail(email);
    }

    @Override
    public List<UserResponseDto> getFriendList() {
        UserEntity user = authService.getLoggedUser();
        List<UserResponseDto> friends = new ArrayList<>();
        for (Friendship f :
                friendshipRepository.findAllByUser(user)) {
            if(friendshipRepository.existsByUserAndFriend(f.getFriend(),user)){
                if(friendshipRepository.existsByUserAndFriend(user,f.getFriend())){
                    friends.add(userMapper.mapToUserResponseDto(f.getFriend()));
                }
            }
        }
        return friends;
    }

    @Override
    public Page<UserResponseDto> searchForUser(String query, int pageNumber, int pageSize) {
        if(query.contains("-")){
            query = query.replace("-", " ");
        }

        String[] words = query.split(" ");

        PageRequest pageRequest = PageRequest.of(
                pageNumber,
                pageSize,
                Sort.by("firstName").ascending()
        );

        Page<UserEntity> users;
        if (words.length > 1) {
            users = userRepository.findByMultipleWords(words[0], words[1], pageRequest);
        } else {
            users = userRepository.findByMultipleWords(words[0], words[0], pageRequest);
        }

        return new PageImpl<>(
                users.getContent().stream().map(userMapper::mapToUserResponseDto).collect(Collectors.toList()),
                pageRequest,
                users.getTotalElements()
        );
    }

    @Override
    public void giveHeart() {
        UserEntity user = authService.getLoggedUser();
        user.setLastGivenHeart(Timestamp.from(Instant.now()));
        userRepository.save(user);
    }

    @Override
    public boolean checkIfHeartAvailable() {
        UserEntity user = authService.getLoggedUser();
        Timestamp now = Timestamp.from(Instant.now());
        Timestamp lastGivenHeart = user.getLastGivenHeart();
        if(lastGivenHeart == null) lastGivenHeart =Timestamp.from(Instant.ofEpochMilli(0));

        ZonedDateTime nowZdt = now.toInstant().atZone(ZoneId.systemDefault());
        ZonedDateTime lastGivenHeartZdt = lastGivenHeart.toInstant().atZone(ZoneId.systemDefault());

        LocalDate nowDate = nowZdt.toLocalDate();
        LocalDate lastGivenHeartDate = lastGivenHeartZdt.toLocalDate();

        // the same day?
        return !nowDate.equals(lastGivenHeartDate);
    }

    @Override
    public UserResponseDto updateUser(Long id, UserRequestPayload userRequestPayload) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFound("User Not found!"));

        if (userRequestPayload.getFirstName() != null) {
            user.setFirstName(userRequestPayload.getFirstName());
        }
        if (userRequestPayload.getLastName() != null) {
            user.setLastName(userRequestPayload.getLastName());
        }
        if (userRequestPayload.getUsername() != null) {
            user.setUsername(userRequestPayload.getUsername());
        }
        if (userRequestPayload.getEmail() != null) {
            user.setEmail(userRequestPayload.getEmail());
        }
        if (userRequestPayload.getPassword() != null) {
            user.setPassword(userRequestPayload.getPassword());
        }
        if (userRequestPayload.getAbout() != null) {
            user.setAbout(userRequestPayload.getAbout());
        }
        if (userRequestPayload.getProfileImage() != null) {
            user.setProfileImage(userRequestPayload.getProfileImage());
        }
        if (userRequestPayload.getBackgroundImage() != null) {
            user.setBackgroundImage(userRequestPayload.getBackgroundImage());
        }

        UserEntity updatedUser = userRepository.save(user);
        return userMapper.mapToUserResponseDto(updatedUser);
    }

    @Override
    public UserResponseDto banUser(Long id, int days) {

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFound("User Not found!"));
        user.setIsBanned(true);
        user.setBannedAt(Timestamp.from(Instant.now()));
        user.setBannedTo(Timestamp.from(Instant.now().plusSeconds(days * 86400L)));
        UserEntity bannedUser = userRepository.save(user);
        return userMapper.mapToUserResponseDto(bannedUser);
    }

    @Override
    public UserResponseDto unbanUser(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFound("User Not found!"));
        user.setIsBanned(false);
        user.setBannedAt(null);
        user.setBannedTo(null);
        UserEntity bannedUser = userRepository.save(user);
        return userMapper.mapToUserResponseDto(bannedUser);
    }


}
