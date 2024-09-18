package com.sms.travelapp.repository;

import com.sms.travelapp.model.Pin;
import com.sms.travelapp.model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.List;

public interface PinRepository extends JpaRepository<Pin,Long> {

    @Query("SELECT p FROM Pin p WHERE p.author.id IN :friendsIds AND p.createdAt > :cutoff ORDER BY p.author.id, p.createdAt DESC")
    List<Pin> findAllByAuthorIds(@Param("friendsIds") List<Long> friendsIds, @Param("cutoff") Timestamp cutoff);

    List<Pin> findAllByAuthorIdAndCreatedAtAfter(Long id, Timestamp timestampCutoff);

    Page<Pin> findAllByAuthorIdOrderByCreatedAtDesc(Long id, PageRequest pg);

    int countAllByAuthor(UserEntity user);
}
