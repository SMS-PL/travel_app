package com.sms.travelapp.repository;

import com.sms.travelapp.model.Pin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PinRepository extends JpaRepository<Pin,Long> {


}
