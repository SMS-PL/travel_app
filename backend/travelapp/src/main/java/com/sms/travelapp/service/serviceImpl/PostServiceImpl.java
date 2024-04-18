package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.dto.Post.PostReactionCountResponseDto;
import com.sms.travelapp.dto.Post.PostRequestDto;
import com.sms.travelapp.dto.Post.PostResponseDto;
import com.sms.travelapp.exception.AccessDenied;
import com.sms.travelapp.exception.HeartAlreadyUsed;
import com.sms.travelapp.exception.PostNotFound;
import com.sms.travelapp.mapper.PostMapper;
import com.sms.travelapp.mapper.PostReactionMapper;
import com.sms.travelapp.model.Post;
import com.sms.travelapp.model.PostReaction;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.PostReactionRepository;
import com.sms.travelapp.repository.PostRepository;
import com.sms.travelapp.repository.UserRepository;
import com.sms.travelapp.service.AuthService;
import com.sms.travelapp.service.PostService;
import com.sms.travelapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final PostReactionRepository postReactionRepository;
    private final UserService userService;
    @Override
    public List<PostResponseDto> getAllPosts() {
        return postRepository.findAll().stream().map(
                PostMapper::mapToPostResponseDto
        ).collect(Collectors.toList());
    }

    @Override
    public String createPost(PostRequestDto postDto) {
        Post post = new Post();
        if (postDto.getContent() == null || postDto.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Content cannot be empty");
        }
        if (postDto.getImageUrl() == null || postDto.getImageUrl().trim().isEmpty()) {
            throw new IllegalArgumentException("ImageUrl cannot be empty");
        }
        if (postDto.getCountryId() == null) {
            //TODO check if country with given id exists
            throw new IllegalArgumentException("Country id cannot be empty");
        }

        UserEntity user = authService.getLoggedUser();

        post.setContent(postDto.getContent());
        post.setImageUrl(postDto.getImageUrl());
        post.setCountryId(postDto.getCountryId());
        post.setAuthorId(user.getId());
        post.setHeartCount(0L);
        post.setLikeCount(0L);
        postRepository.save(post);

        return "Post Created!";
    }

    @Override
    public String deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(
                ()-> new PostNotFound("Post id-"+id+" not found"));

        UserEntity user = authService.getLoggedUser();

        if(!Objects.equals(post.getAuthorId(), user.getId())){
            throw new AccessDenied("You are not authorized to delete this post!");
        }
        postRepository.deleteById(post.getId());
        return "Post id-"+ id +" deleted";
    }

    @Override
    public PostResponseDto updatePost(Long id,PostRequestDto postRequestDto) {
       UserEntity user = authService.getLoggedUser();
       Post postDb = postRepository.findById(id).orElseThrow(
               ()-> new PostNotFound("Post id-"+id+" not found")
       );
       if(!postDb.getAuthorId().equals(user.getId())){
           throw new AccessDeniedException("You are not authorized to update this post");
       }

       if(postRequestDto.getContent() != null){
           postDb.setContent(postRequestDto.getContent());
       }

       postRepository.save(postDb);

        return PostMapper.mapToPostResponseDto(postDb);
    }

    @Override
    public PostResponseDto getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(
                ()-> new PostNotFound("Post id-"+id+" not found")
        );
        return PostMapper.mapToPostResponseDto(post);
    }

    @Override
    public PostReactionCountResponseDto reactToPost(Long postId, int reactionType) {
        UserEntity user = authService.getLoggedUser();
        Post postDb = postRepository.findById(postId).orElseThrow(
                ()-> new PostNotFound("Post id-"+postId+" not found")
        );

        PostReaction postReaction;

        if(postReactionRepository.existsByAuthorAndPost(user,postDb)){

            postReaction = postReactionRepository.findByAuthorAndPost(user,postDb);
            if(postReaction.getReactionType()==reactionType){
                if (postReaction.getReactionType() == 0) {
                    postDb.setLikeCount(postDb.getLikeCount() - 1);
                } else {
                    postDb.setHeartCount(postDb.getHeartCount() - 1);
                }
                System.out.println(postDb.getLikeCount());
                postReactionRepository.delete(postReaction);
                postRepository.save(postDb);
            }else{
                if(reactionType==1){
                   if(!userService.checkIfHeartAvailable()){
                       throw new HeartAlreadyUsed("You have already used your 1 heart reaction a day. Try again tomorrow");
                   }else{
                       postReaction.setReactionType(1);
                       postDb.setLikeCount(postDb.getLikeCount()-1);
                       postDb.setHeartCount(postDb.getHeartCount()+1);
                       postReactionRepository.save(postReaction);
                       userService.giveHeart();
                       postRepository.save(postDb);
                   }
                }else{
                    postReaction.setReactionType(0);
                    postDb.setLikeCount(postDb.getLikeCount()+1);
                    postDb.setHeartCount(postDb.getHeartCount()-1);
                    postReactionRepository.save(postReaction);
                    postRepository.save(postDb);
                }
            }
        }
        else{
            if (reactionType == 0) {
                postReaction = new PostReaction();
                postReaction.setReactionType(0);
                postReaction.setAuthor(user);
                postReaction.setPost(postDb);
                postReactionRepository.save(postReaction);
                postDb.setLikeCount(postDb.getLikeCount()+1);
                postRepository.save(postDb);
            }else{
                if(userService.checkIfHeartAvailable()){
                    postReaction = new PostReaction();
                    postReaction.setReactionType(1);
                    postReaction.setAuthor(user);
                    postReaction.setPost(postDb);
                    postReactionRepository.save(postReaction);
                    postDb.setLikeCount(postDb.getHeartCount()+1);
                    postRepository.save(postDb);
                }else{
                    throw new HeartAlreadyUsed("You have already used your 1 heart reaction a day. Try again tomorrow");
                }
            }
        }

        return PostReactionMapper.mapToPostReactionCountResponseDto(postReaction);
    }

    @Override
    public Page<PostResponseDto> getFeedPosts(String feedType, int pageSize, int pageNumber) {
       Page<Post> postsPage;

       if(Objects.equals(feedType, "friends")) {
           List<Long> friendsIds = userService.getFriendList()
                   .stream()
                   .map(UserResponseDto::getId)
                   .toList();

           postsPage = postRepository.findAllByUserEntity_IdIn(friendsIds, PageRequest.of(pageNumber, pageSize,Sort.by("createdAt").descending()));

       }else if(feedType.equals("home")){
            postsPage = postRepository.findAll(PageRequest.of(pageNumber,
                   pageSize,
                   Sort.by("createdAt").descending()));
       }else{
           //TODO
           postsPage = null;
       }


        return new PageImpl<>(
                postsPage
                        .stream()
                        .map(PostMapper::mapToPostResponseDto)
                        .collect(Collectors.toList()),
                PageRequest.of(pageNumber,pageSize),
                postsPage.getTotalElements()
        );
    }

    @Override
    public Page<PostResponseDto> getPostsByUser(Long userId, int pageSize, int pageNumber) {
        Page<Post> postsPage = postRepository.findAllByAuthorId(userId,PageRequest.of(pageNumber,
                pageSize,
                Sort.by("createdAt").descending()));

        return new PageImpl<>(
                postsPage
                        .stream()
                        .map(PostMapper::mapToPostResponseDto)
                        .collect(Collectors.toList()),
                PageRequest.of(pageNumber,pageSize),
                postsPage.getTotalElements()
        );

    }
}
