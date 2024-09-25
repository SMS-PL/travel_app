package com.sms.travelapp.repository;

import com.sms.travelapp.model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
    Optional<UserEntity> findByUsername(String username);

    Optional<UserEntity> findByEmail(String email);

    Boolean existsByEmail(String email);

    Boolean existsByUsername(String username);

//    @Query("SELECT u FROM UserEntity u WHERE u.username LIKE %:query% OR u.firstName LIKE %:query% OR u.lastName LIKE %:query% OR u.email LIKE %:query%")
//    Page<UserEntity> findByUsernameOrFirstNameOrLastNameContaining(@Param("query") String query, Pageable pageable);

    @Query("SELECT u FROM UserEntity u WHERE " +
            "((u.username LIKE %:word1% OR u.firstName LIKE %:word1% OR u.lastName LIKE %:word1% OR u.email LIKE %:word1%) AND u.isBanned = false) " +
            "OR " +
            "((u.username LIKE %:word2% OR u.firstName LIKE %:word2% OR u.lastName LIKE %:word2% OR u.email LIKE %:word2%) AND u.isBanned = false)")
    Page<UserEntity> findByMultipleWords(@Param("word1") String word1, @Param("word2") String word2, Pageable pageable);

    Long countByIsBannedTrue();

    @Query(
            "SELECT u FROM UserEntity u " +
                    "JOIN u.roles r " +
                    "WHERE (" +
                    "((u.username LIKE %:word% OR u.firstName LIKE %:word% OR u.lastName LIKE %:word% OR u.email LIKE %:word%) " +
                    "OR " +
                    "(u.username LIKE %:word1% OR u.firstName LIKE %:word1% OR u.lastName LIKE %:word1% OR u.email LIKE %:word1%)) " +
                    "AND u.isBanned = false) " +
                    "AND r.name = 'ROLE_ADMIN'"
    )
    Page<UserEntity> findAdminsByMultipleWords(@Param("word") String word, @Param("word1") String word1, PageRequest pageRequest);


    @Query("SELECT u FROM UserEntity u WHERE " +
            "((u.username LIKE %:word1% OR u.firstName LIKE %:word1% OR u.lastName LIKE %:word1% OR u.email LIKE %:word1%)) " +
            "OR " +
            "((u.username LIKE %:word2% OR u.firstName LIKE %:word2% OR u.lastName LIKE %:word2% OR u.email LIKE %:word2%))")
    Page<UserEntity> findByMultipleWordsWithBanned(@Param("word1") String word1, @Param("word2") String word2, Pageable pageable);
}
