package com.isppG8.infantem.infantem.advertisement;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.UserService;

@Service
public class AdvertisementService {

    private AdvertisementRepository advertisementRepository;
    private UserService userService;

    private final Map<Long, Map<Integer, Long>> viewActivity = new HashMap<>();

    @Autowired
    public AdvertisementService(AdvertisementRepository advertisementRepository, UserService userService) {
        this.advertisementRepository = advertisementRepository;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public List<Advertisement> getAllAdvertisements() {
        return this.advertisementRepository.findAllAdvertisements();
    }

    @Transactional(readOnly = true)
    public Advertisement getAdvertisementById(Long advertisementId) {
        Advertisement ad = this.advertisementRepository.findById(advertisementId)
                .orElseThrow(() -> new ResourceNotFoundException("Advertisement", "id", advertisementId));
        return ad;
    }

    @Transactional(readOnly = true)
    public List<Advertisement> getAdvertisementByCompanyName(String companyName) {
        return this.advertisementRepository.findAdvertisementsByCompanyName(companyName);
    }

    public Optional<Advertisement> getAdvertisementToShow() {
        Optional<Advertisement> adToShow = this.advertisementRepository.findAdvertisementToShow();
        return adToShow;
    }

    @Transactional
    public Advertisement updateAdvertisement(Long advertisementId, Advertisement advertisementDetails) {
        Advertisement advertisement = this.advertisementRepository.findById(advertisementId)
                .orElseThrow(() -> new ResourceNotFoundException("Advertisement", "id", advertisementId));

        advertisement.setCompanyName(advertisementDetails.getCompanyName());
        advertisement.setTitle(advertisementDetails.getTitle());
        advertisement.setPhotoRoute(advertisementDetails.getPhotoRoute());

        return this.advertisementRepository.save(advertisement);
    }

    public void startViewingAdvertisement(Long id) {
        Integer userId = userService.findCurrentUser().getId();

        viewActivity.putIfAbsent(id, new ConcurrentHashMap<>());
        viewActivity.get(id).put(userId, System.currentTimeMillis());
    }

    @Transactional
    public Advertisement stopViewingAdvertisement(Long id) {
        Advertisement advertisement = this.advertisementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Advertisement", "id", id));

        Integer userId = userService.findCurrentUser().getId();

        if (!viewActivity.containsKey(id) || !viewActivity.get(id).containsKey(userId))
            throw new IllegalStateException("No se ha registrado la visualización del anuncio");

        long startViewingTime = viewActivity.get(id).remove(userId);
        long viewingTime = (System.currentTimeMillis() - startViewingTime) / 1000 / 60;

        advertisement.setTimeSeen(advertisement.getTimeSeen() + (int) viewingTime);
        advertisementRepository.save(advertisement);

        return advertisement;
    }

    @Transactional
    public Advertisement completeAdvertisement(Long id) {
        Advertisement advertisement = this.advertisementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Advertisement", "id", id));

        if (advertisement.getTimeSeen() >= advertisement.getMaxMinutes()) {
            advertisement.setIsCompleted(true);
            this.advertisementRepository.save(advertisement);
        }
        return advertisement;
    }

    @Transactional
    public Advertisement updateAdvertisementClicks(Long advertisementId) {
        Advertisement advertisement = this.advertisementRepository.findById(advertisementId)
                .orElseThrow(() -> new ResourceNotFoundException("Advertisement", "id", advertisementId));

        advertisement.setTotalClicks(advertisement.getTotalClicks() + 1);

        return this.advertisementRepository.save(advertisement);
    }

    @Transactional
    public void deleteAdvertisement(Long advertisementId) {
        Advertisement advertisement = this.advertisementRepository.findById(advertisementId)
                .orElseThrow(() -> new ResourceNotFoundException("Advertisement", "id", advertisementId));

        this.advertisementRepository.delete(advertisement);
    }

}
