package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Auth.UserResponseDto;
import com.sms.travelapp.dto.Post.PostReactionCountResponseDto;
import com.sms.travelapp.dto.Post.PostRequestDto;
import com.sms.travelapp.dto.Post.PostResponseDto;
import com.sms.travelapp.exception.AccessDenied;
import com.sms.travelapp.exception.HeartAlreadyUsed;
import com.sms.travelapp.exception.PostNotFound;
import com.sms.travelapp.infrastructure.PermissionChecker;
import com.sms.travelapp.mapper.PostMapper;
import com.sms.travelapp.mapper.PostReactionMapper;
import com.sms.travelapp.model.Post;
import com.sms.travelapp.model.PostReaction;
import com.sms.travelapp.model.Role;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.*;
import com.sms.travelapp.service.*;
import jakarta.transaction.Transactional;
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
    private final NotificationService notificationService;
    private final CommentRepository commentRepository;
    private final CommentReactionRepository commentReactionRepository;

    private final PermissionChecker pc;
    @Override
    public List<PostResponseDto> getAllPosts() {
        return postRepository.findAll().stream().filter(post->{
            UserEntity user = userRepository.findById(post.getAuthorId()).orElseThrow(
                    ()-> new IllegalArgumentException("Post author not found")
            );
            return !user.getIsBanned();
        }).map(
                PostMapper::mapToPostResponseDto
        ).collect(Collectors.toList());
    }


    private boolean validatePostRequest(PostRequestDto postDto) {
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
        return true;
    }
    @Override
    public String createPost(PostRequestDto postDto) {

        if(!validatePostRequest(postDto)) return "Invalid Post Request";

        UserEntity user = authService.getLoggedUser();
        Post post = Post.builder()
                .authorId(user.getId())
                .content(postDto.getContent())
                .imageUrl(postDto.getImageUrl())
                .countryId(postDto.getCountryId())
                .likeCount(0L)
                .heartCount(0L)
                .build();

        postRepository.save(post);
        return "Post Created!";
    }

    @Override
    @Transactional
    public String deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(
                ()-> new PostNotFound("Post id-"+id+" not found"));

        UserEntity user = authService.getLoggedUser();


        if(!Objects.equals(post.getAuthorId(), user.getId()) && pc.isAdmin(user.getId())){
                throw new AccessDenied("You are not authorized to delete this post!");
        }
        post.setDeleted(true);
        postRepository.save(post);

        return "Post id-"+ id +" deleted";
    }

    private void deleteAllCascade(Post post){
        commentReactionRepository.deleteAllByComment_Post_Id(post.getId());
        commentRepository.deleteByPostId(post.getId());
        postReactionRepository.deleteByPostId(post.getId());
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
        if (post.isDeleted()) {
            throw new PostNotFound("Post id-"+id+" not found");
        }
        UserEntity user = userRepository.findById(post.getAuthorId()).orElseThrow(
                ()-> new IllegalArgumentException("Post author not found")
        );
        if(user.getIsBanned()){
            throw new PostNotFound("Post id-"+id+" not found");
        }

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
                postReactionRepository.delete(postReaction);
                postRepository.save(postDb);
            }else{
                if(reactionType==1){
                   if(!userService.checkIfHeartAvailable()){
                       throw new HeartAlreadyUsed("You have already used your 1 heart reaction a day. Try again tomorrow");
                   }else{
                       postReaction.setReactionType(1);
                       postDb.setLikeCount(postDb.getLikeCount()-1);
                       postDb.setHeartCount(postDb.getHeartCount()==null?1: postDb.getHeartCount()+1);
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
                postDb.setLikeCount(postDb.getLikeCount()==null?1: postDb.getLikeCount()+1);
                postRepository.save(postDb);
            }else{

                if(userService.checkIfHeartAvailable()){
                    postReaction = new PostReaction();
                    postReaction.setReactionType(1);
                    postReaction.setAuthor(user);
                    postReaction.setPost(postDb);
                    postReactionRepository.save(postReaction);
                    postDb.setHeartCount(postDb.getHeartCount()+1);
                    userService.giveHeart();
                    postRepository.save(postDb);
                }else{
                    throw new HeartAlreadyUsed("You have already used your 1 heart reaction a day. Try again tomorrow");
                }
            }
        }

        notificationService.createNotification(1,user.getId(),postDb.getAuthorId(),postDb.getId());

        return PostReactionMapper.mapToPostReactionCountResponseDto(postReaction);
    }

    @Override
    public Page<PostResponseDto> getFeedPosts(String feedType, int pageSize, int pageNumber) {
       Page<Post> postsPage;

       if(Objects.equals(feedType, "friends")) {
           List<Long> friendsIds = userService.getFriendList()
                   .stream()
                   .filter(friend->!friend.isBanned())
                   .map(UserResponseDto::getId)
                   .toList();

           postsPage = postRepository.findAllByUserEntity_IdIn(friendsIds, PageRequest.of(pageNumber, pageSize,Sort.by("createdAt").descending()));

       }else if(feedType.equals("home")){
            postsPage = postRepository.findAllPosts(PageRequest.of(pageNumber,
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
        Page<Post> postsPage = postRepository.findAllByAuthorIdAndDeletedIsFalse(userId,PageRequest.of(pageNumber,
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

    @Override
    public Integer checkUserReaction(Long postId) {
        UserEntity user = authService.getLoggedUser();
        Post post = postRepository.findById(postId).orElseThrow(
                ()-> new PostNotFound("Post not found!")
        );

        if(postReactionRepository.existsByAuthorAndPost(user,post)){
            return postReactionRepository.findByAuthorAndPost(user,post).getReactionType();
        }else{
            return -1;
        }

    }

    @Override
    public Long getPostIdByCommentId(Long commentId) {
        Post post = commentRepository.findById(commentId).orElseThrow(
                ()-> new IllegalArgumentException("Comment id-"+commentId+" not found")
        ).getPost();

        UserEntity user = userRepository.findById(post.getAuthorId()).orElseThrow(
                ()-> new IllegalArgumentException("Post author not found")
        );
        if(user.getIsBanned()) {
            return -1L;
        }
        return post.getId();
    }
}
