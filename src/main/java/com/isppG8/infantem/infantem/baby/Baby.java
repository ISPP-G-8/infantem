package com.isppG8.infantem.infantem.baby;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.isppG8.infantem.infantem.allergen.Allergen;
import com.isppG8.infantem.infantem.disease.Disease;
import com.isppG8.infantem.infantem.dream.Dream;
import com.isppG8.infantem.infantem.intake.Intake;
import com.isppG8.infantem.infantem.metric.Metric;
import com.isppG8.infantem.infantem.milestoneCompleted.MilestoneCompleted;
import com.isppG8.infantem.infantem.nutritionalContribution.NutritionalContribution;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.vaccine.Vaccine;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@JsonIdentityInfo(scope = Baby.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Getter
@Setter
@Table(name = "baby_table")
public class Baby {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String name;

    @NotNull
    @PastOrPresent
    @DateTimeFormat(pattern = "yyyy/MM/dd")
    private LocalDate birthDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Genre genre;

    @NotNull
    private Double weight;

    @NotNull
    @Min(0)
    @Max(200)
    private Integer height;

    @NotNull
    @Min(0)
    private Integer headCircumference;

    @NotBlank
    private String foodPreference;

    // Relaciones

    @OneToOne
    private NutritionalContribution nutritionalContribution;

    @OneToMany(mappedBy = "baby", cascade = CascadeType.ALL)
    private List<Dream> sleep = new ArrayList<>();

    @OneToMany(mappedBy = "baby", cascade = CascadeType.ALL)
    private List<Metric> metrics = new ArrayList<>();

    @OneToMany(mappedBy = "baby", cascade = CascadeType.ALL)
    private List<MilestoneCompleted> milestonesCompleted = new ArrayList<>();

    @OneToMany(mappedBy = "baby", cascade = CascadeType.ALL)
    private List<Intake> intakes = new ArrayList<>();

    @OneToMany(mappedBy = "baby", cascade = CascadeType.ALL)
    private List<Vaccine> vaccines = new ArrayList<>();

    @OneToMany(mappedBy = "baby", cascade = CascadeType.ALL)
    private List<Disease> diseases = new ArrayList<>();

    @ManyToMany(mappedBy = "babies", cascade = CascadeType.ALL)
    private List<Allergen> allergen = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "user_baby", joinColumns = @JoinColumn(name = "baby_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    @Size(min = 1, max = 2, message = "A baby should have 1 or 2 users")
    private List<User> users = new ArrayList<>();
}
