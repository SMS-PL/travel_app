package com.sms.travelapp.service.serviceImpl;

import com.opencagedata.jopencage.JOpenCageGeocoder;
import com.opencagedata.jopencage.model.JOpenCageResponse;
import com.opencagedata.jopencage.model.JOpenCageReverseRequest;
import com.sms.travelapp.dto.PlaceDetails;
import com.sms.travelapp.exception.PlaceNotFound;
import com.sms.travelapp.mapper.CountryMapper;
import com.sms.travelapp.model.Country;
import com.sms.travelapp.service.CountryService;
import com.sms.travelapp.service.GeolocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.geo.Point;

@Service
@RequiredArgsConstructor
public class GeolocationServiceImpl implements GeolocationService {

    private final CountryService countryService;
    @Override
    public PlaceDetails getInfo(Point localization) {
        String apiKey = System.getProperty("GEO_API_KEY");
        JOpenCageGeocoder jOpenCageGeocoder = new JOpenCageGeocoder(apiKey);
        JOpenCageReverseRequest request = new JOpenCageReverseRequest(localization.getX(), localization.getY());

        request.setLanguage("en"); // show results in a specific language using an IETF format language code
        request.setLimit(5); // only return the first 5 results (default is 10)
        request.setNoAnnotations(false); // exclude additional info such as calling code, timezone, and currency
        request.setMinConfidence(3); // restrict to results with a confidence rating of at least 3 (out of 10)

        JOpenCageResponse response = jOpenCageGeocoder.reverse(request);
        PlaceDetails placeDetails;
        try{
            String city = response.getResults().get(0).getComponents().getCity();
            String continent = response.getResults().get(0).getComponents().getContinent();
            String iso3 = response.getResults().get(0).getComponents().getIso31661Alpha3();

            Country country = countryService.getCountryByIso3(iso3);

            placeDetails =  PlaceDetails.builder()
                    .country(country)
                    .city(city)
                   .continent(continent)
                    .iso3(iso3)
                    .build();

        }catch (Exception e){
            throw new PlaceNotFound("Cant find place info based on given localization",e.getCause());
        }

        return placeDetails;
    }
}
