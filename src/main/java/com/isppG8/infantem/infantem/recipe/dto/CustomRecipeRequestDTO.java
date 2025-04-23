package com.isppG8.infantem.infantem.recipe.dto;

import java.time.LocalDateTime;

import com.isppG8.infantem.infantem.recipe.CustomRecipeRequest;
import com.isppG8.infantem.infantem.recipe.RequestStatus;
import com.isppG8.infantem.infantem.user.dto.UserSummaryDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomRecipeRequestDTO {

    private Long id;

    private String details;

    private LocalDateTime createdAt;

    private RequestStatus status;

    private UserSummaryDTO user;

    public CustomRecipeRequestDTO() {
    }

    public CustomRecipeRequestDTO(CustomRecipeRequest customRecipeRequest) {
        this.id = customRecipeRequest.getId();
        this.details = customRecipeRequest.getDetails();
        this.createdAt = customRecipeRequest.getCreatedAt();
        this.status = customRecipeRequest.getStatus();
        if (customRecipeRequest.getUser() != null)
            this.user = new UserSummaryDTO(customRecipeRequest.getUser());

    }
}
