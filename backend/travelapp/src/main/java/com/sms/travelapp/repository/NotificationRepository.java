package com.sms.travelapp.repository;

import com.sms.travelapp.model.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NotificationRepository extends JpaRepository<Notification,Long> {


    Page<Notification> findAllByReceiverId(Long id, Pageable pageable);

    Boolean existsByAuthorIdAndAndContentIdAndType(Long authorId, Long contentId, int type);

}
