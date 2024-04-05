package com.sms.travelapp.dto.Post;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class PostRequestDto {

    @NotBlank(message = "Content cannot be empty")
    private String content;

    @NotNull(message = "Country id cannot be empty")
    private Long countryId;

    @NotBlank(message = "ImageUrl cannot be empty")
    private String imageUrl;
}
