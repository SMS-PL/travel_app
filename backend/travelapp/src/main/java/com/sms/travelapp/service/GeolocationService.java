package com.sms.travelapp.service;


import com.sms.travelapp.dto.PlaceDetails;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;


public interface GeolocationService {

    public PlaceDetails getInfo(Point localization);

}
