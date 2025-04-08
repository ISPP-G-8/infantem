package com.isppG8.infantem.infantem.advertisement;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@JsonIdentityInfo(scope = Advertisement.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = "advertisement_table")
public class Advertisement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String companyName;

    @NotBlank
    @Size(min = 3, max = 50)
    private String title;

    @NotNull
    private String targetUrl;

    @Size(max = 255)
    private String photoRoute;

    @NotNull
    @Min(0)
    private Integer timeSeen;

    @NotNull
    @Min(0)
    private Integer totalClicks;

    @NotNull
    @Min(1)
    private Integer maxMinutes;

    @NotNull
    private Boolean isCompleted;

}
