package com.isppG8.infantem.infantem.recipe;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isppG8.infantem.infantem.exceptions.ResourceNotFoundException;
import com.isppG8.infantem.infantem.user.User;
import com.isppG8.infantem.infantem.user.UserService;

@Service
public class CustomRecipeRequestService {

    private CustomRecipeRequestRepository requestRepository;
    private UserService userService;

    @Autowired
    public CustomRecipeRequestService(CustomRecipeRequestRepository requestRepository, UserService userService) {
        this.requestRepository = requestRepository;
        this.userService = userService;
    }

    public List<CustomRecipeRequest> getAllRequests() {
        User user = userService.findCurrentUser();
        if (user.getAuthorities().getAuthority().equals("nutritionist")) {
            return requestRepository.findAll();
        } else {
            throw new ResourceNotFoundException("You are not authorized to access this resource");
        }
    }

    public CustomRecipeRequest createRequest(CustomRecipeRequest request) {
        return requestRepository.save(request);
    }

}
