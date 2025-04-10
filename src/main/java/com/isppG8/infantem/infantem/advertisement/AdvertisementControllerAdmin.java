package com.isppG8.infantem.infantem.advertisement;

import java.util.List;
import java.util.Optional;

import com.isppG8.infantem.infantem.auth.AuthoritiesService;
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

@RestController
@RequestMapping("api/v1/admin/advertisements")
public class AdvertisementControllerAdmin {

    private AdvertisementService advertisementService;

    private AuthoritiesService authoritiesService;

    @Autowired
    public AdvertisementControllerAdmin(AdvertisementService advertisementService,
            AuthoritiesService authoritiesService) {
        this.advertisementService = advertisementService;
        this.authoritiesService = authoritiesService;
    }

    @GetMapping
    public ResponseEntity<List<Advertisement>> getAllAdvertisements() {
        if (authoritiesService.isAdmin()) {
            List<Advertisement> advertisements = advertisementService.getAllAdvertisements();
            return ResponseEntity.ok(advertisements);
        }
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Advertisement> getAdvertisementById(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            Advertisement advertisement = advertisementService.getAdvertisementById(id);
            return ResponseEntity.ok(advertisement);
        }
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Advertisement> updateAdvertisement(@PathVariable Long id,
            @RequestBody Advertisement advertisementDetails) {
        if (authoritiesService.isAdmin()) {
            Advertisement updatedAdvertisement = advertisementService.updateAdvertisement(id, advertisementDetails);
            return ResponseEntity.ok(updatedAdvertisement);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdvertisement(@PathVariable Long id) {
        if (authoritiesService.isAdmin()) {
            advertisementService.deleteAdvertisement(id);
            return ResponseEntity.ok().build();
        }
        return null;
    }

}
