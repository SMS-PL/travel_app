package com.sms.travelapp.service.serviceImpl;

import com.sms.travelapp.dto.Comment.CommentReactionCountResponseDto;
import com.sms.travelapp.dto.Comment.CommentRequestDto;
import com.sms.travelapp.dto.Comment.CommentResponseDto;
import com.sms.travelapp.exception.AccessDenied;
import com.sms.travelapp.exception.CommentNotFound;
import com.sms.travelapp.exception.PostNotFound;
import com.sms.travelapp.infrastructure.PermissionChecker;
import com.sms.travelapp.mapper.CommentMapper;
import com.sms.travelapp.mapper.StringResponseMapper;
import com.sms.travelapp.model.Comment;
import com.sms.travelapp.model.CommentReaction;
import com.sms.travelapp.model.Post;
import com.sms.travelapp.model.UserEntity;
import com.sms.travelapp.repository.CommentReactionRepository;
import com.sms.travelapp.repository.CommentRepository;
import com.sms.travelapp.repository.PostRepository;
import com.sms.travelapp.service.AuthService;
import com.sms.travelapp.service.CommentService;
import com.sms.travelapp.service.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final AuthService authService;
    private final PostRepository postRepository;
    private final CommentReactionRepository commentReactionRepository;
    private final NotificationService notificationService;

    private final PermissionChecker pc;

    @Override
    public Page<CommentResponseDto> getCommentsByPostId(Long postId, int pageSize, int pageNumber, String sortBy) {
        Sort sort = Sort.by("createdAt").descending();
        if(Objects.equals(sortBy, "dateAsc")){
            sort = Sort.by("createdAt").ascending();
        }else if(Objects.equals(sortBy, "reactionAsc")){
            sort = Sort.by("reactionCount").ascending();
        } else if (Objects.equals(sortBy, "reactionDesc")) {
            sort = Sort.by("reactionCount").descending();
        }

        Page<Comment> commentPage = commentRepository.findAllByPost_IdAndDeletedIsFalse(postId, PageRequest.of(pageNumber,pageSize,sort));

        return new PageImpl<>(
                commentPage
                        .stream()
                        .map(CommentMapper::MapToCommentResponseDto)
                        .collect(Collectors.toList()),PageRequest.of(pageNumber,pageSize,sort),
                commentPage.getTotalElements()
        );

    }

    @Override
    public CommentResponseDto addComment(Long postId, CommentRequestDto commentRequestDto) {
        UserEntity user = authService.getLoggedUser();
        Post post  = postRepository.findById(postId).orElseThrow(
                ()-> new PostNotFound("Post not found!")
        );


        Comment comment = new Comment();
        comment.setContent(commentRequestDto.getContent());
        comment.setAuthor(user);
        comment.setPost(post);

        commentRepository.save(comment);

        notificationService.createNotification(0,user.getId(),post.getAuthorId(),post.getId());


        return CommentMapper.MapToCommentResponseDto(comment);
    }

    @Override
    @Transactional
    public Map<String, String> removeComment(Long commentId) {
        UserEntity user = authService.getLoggedUser();
        Comment comment = commentRepository.findById(commentId).orElseThrow(
                ()-> new CommentNotFound("Comment not found!")
        );
        if(!comment.getAuthor().equals(user) && pc.isAdmin(user.getId())){
            throw new AccessDenied("This is not your comment!");
        }

        comment.setDeleted(true);
        commentRepository.save(comment);

        return StringResponseMapper.mapToMap("Comment id-" + commentId + " deleted successfully");

    }

    public void deleteReactionsByCommentId(Long commentId){
        commentReactionRepository.deleteByCommentId(commentId);
    }

    @Override
    public CommentResponseDto editComment(Long commentId, CommentRequestDto commentRequestDto) {
        UserEntity user = authService.getLoggedUser();
        Comment comment = commentRepository.findById(commentId).orElseThrow(
                () -> new CommentNotFound("Comment not found!")
        );
        if (!comment.getAuthor().equals(user)) {
            throw new AccessDenied("This is not your comment!");
        }

        comment.setContent(commentRequestDto.getContent());
        commentRepository.save(comment);
        return CommentMapper.MapToCommentResponseDto(comment);
    }

    @Override
    public CommentReactionCountResponseDto reactToComment(Long commentId) {
        UserEntity user = authService.getLoggedUser();
        Comment comment = commentRepository.findById(commentId).orElseThrow(
                () -> new CommentNotFound("Comment not found!")
        );

        if(commentReactionRepository.existsByAuthorAndComment(user,comment)){
           CommentReaction commentReaction = commentReactionRepository.findByAuthorAndComment(user,comment);
           comment.setReactionCount(comment.getReactionCount()-1);
           commentReactionRepository.delete(commentReaction);
        }else{
            CommentReaction commentReaction = new CommentReaction();
            commentReaction.setAuthor(user);
            commentReaction.setComment(comment);
            comment.setReactionCount(
                        comment.getReactionCount()==null
                                ? 1L
                                : comment.getReactionCount()+1
            );
            commentRepository.save(comment);
            commentReactionRepository.save(commentReaction);
        }

        notificationService.createNotification(2,user.getId(),comment.getAuthor().getId(),comment.getId());
        return CommentMapper.MapToCommentReactionCountResponseDto(comment);
        
    }

    @Override
    public Map<String, Boolean> checkUserReaction(Long commentId) {
        UserEntity user = authService.getLoggedUser();
        Comment comment = commentRepository.findById(commentId).orElseThrow(
                () -> new CommentNotFound("Comment not found!")
        );

        if(commentReactionRepository.existsByAuthorAndComment(user,comment)){
            return Map.of("reacted",true);
        }
        return Map.of("reacted",false);
    }
}
