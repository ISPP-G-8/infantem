package com.isppG8.infantem.infantem.recipe;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isppG8.infantem.infantem.exceptions.CustomRecipeRequestLimitException;
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

    public Integer getNumRequestsByUserIdActualMonth(Integer userId) {
        User user = userService.findCurrentUser();
        if (user.getAuthorities().getAuthority().equals("nutritionist")) {
            LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime endOfMonth = LocalDateTime.now().withDayOfMonth(LocalDateTime.now().getMonth().length(false))
                    .withHour(23).withMinute(59).withSecond(59);
            return requestRepository.countRequestsByUserIdAndDate(userId, startOfMonth, endOfMonth);
        } else {
            throw new ResourceNotFoundException("You are not authorized to access this resource");
        }
    }

    public CustomRecipeRequest createRequest(CustomRecipeRequest request) {
        User user = userService.findCurrentUser();
        if (!user.getAuthorities().getAuthority().equals("premium")) {
            throw new ResourceNotFoundException("You are not authorized to create a request");
        } else if (getNumRequestsByUserIdActualMonth(user.getId()) >= 5) {
            throw new CustomRecipeRequestLimitException();
        } else {
            request.setUser(user);
            return requestRepository.save(request);
        }
    }

    public void deleteRequest(Long id) {
        CustomRecipeRequest request = requestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));
        User user = userService.findCurrentUser();
        if (!(request.getStatus().equals(RequestStatus.IN_PROGRESS)
                || request.getStatus().equals(RequestStatus.CLOSED))) {
            if (request.getUser().getId().equals(user.getId())) {
                this.requestRepository.delete(request);
            } else {
                throw new ResourceNotFoundException("You are not authorized to delete this request");
            }
        } else {
            throw new IllegalArgumentException("Request cannot be deleted when it is in progress or closed");
        }
    }

    public CustomRecipeRequest closeRequest(Long id) {
        CustomRecipeRequest request = requestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));
        User user = userService.findCurrentUser();
        if (request.getStatus().equals(RequestStatus.OPEN)
                || request.getStatus().equals(RequestStatus.IN_PROGRESS)) {
            if (request.getUser().getId().equals(user.getId())) {
                request.setStatus(RequestStatus.CLOSED);
                return requestRepository.save(request);
            } else {
                throw new ResourceNotFoundException("You are not authorized to close this request");
            }
        } else {
            throw new IllegalArgumentException("Request is already closed");
        }
    }

}
