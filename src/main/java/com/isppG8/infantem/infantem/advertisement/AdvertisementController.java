package com.isppG8.infantem.infantem.advertisement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isppG8.infantem.infantem.user.UserService;

@RestController
@RequestMapping("api/v1/advertisements")
public class AdvertisementController {

    private AdvertisementService advertisementService;

    @Autowired
    public AdvertisementController(AdvertisementService advertisementService, UserService userService) {
        this.advertisementService = advertisementService;
    }

    @GetMapping
    public ResponseEntity<List<Advertisement>> getAllAdvertisements() {
        List<Advertisement> advertisements = advertisementService.getAllAdvertisements();
        return ResponseEntity.ok(advertisements);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Advertisement> getAdvertisementById(@PathVariable Long id) {
        Advertisement advertisement = advertisementService.getAdvertisementById(id);
        return ResponseEntity.ok(advertisement);
    }

    @GetMapping("/companyName/{companyName}")
    public ResponseEntity<List<Advertisement>> getAdvertisementsByCompanyName(@PathVariable String companyName) {
        List<Advertisement> advertisements = advertisementService.getAdvertisementByCompanyName(companyName);
        return ResponseEntity.ok(advertisements);
    }

    @GetMapping("/toShow")
    public ResponseEntity<Advertisement> getAdvertisementToShow() {
        Optional<Advertisement> adToShow = advertisementService.getAdvertisementToShow();
        return adToShow.map(ResponseEntity::ok).orElse(ResponseEntity.noContent().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Advertisement> updateAdvertisement(@PathVariable Long id,
            @RequestBody Advertisement advertisementDetails) {
        Advertisement updatedAdvertisement = advertisementService.updateAdvertisement(id, advertisementDetails);
        return ResponseEntity.ok(updatedAdvertisement);
    }

    @PostMapping("/start-viewing/{id}")
    public ResponseEntity<Void> startViewingAdvertisement(@PathVariable Long id) {
        advertisementService.startViewingAdvertisement(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/stop-viewing/{id}")
    public ResponseEntity<Advertisement> stopViewingAdvertisement(@PathVariable Long id) {
        Advertisement updatedAdvertisement = advertisementService.stopViewingAdvertisement(id);
        return ResponseEntity.ok(updatedAdvertisement);
    }

    @PostMapping("/complete/{id}")
    public ResponseEntity<Advertisement> completeAdvertisement(@PathVariable Long id) {
        Advertisement updatedAdvertisement = advertisementService.completeAdvertisement(id);
        return ResponseEntity.ok(updatedAdvertisement);
    }

    @PostMapping("/clicks/{id}")
    public ResponseEntity<Advertisement> updateAdvertisementClicks(@PathVariable Long id) {
        Advertisement updatedAdvertisement = advertisementService.updateAdvertisementClicks(id);
        return ResponseEntity.ok(updatedAdvertisement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdvertisement(@PathVariable Long id) {
        advertisementService.deleteAdvertisement(id);
        return ResponseEntity.ok().build();
    }

}
