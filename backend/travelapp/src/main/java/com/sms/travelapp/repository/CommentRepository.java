package com.sms.travelapp.repository;

import com.sms.travelapp.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {

    Page<Comment> findAllByPost_Id(Long postId, PageRequest pg);
}
