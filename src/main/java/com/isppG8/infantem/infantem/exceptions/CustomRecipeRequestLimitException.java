package com.isppG8.infantem.infantem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
@Getter
public class CustomRecipeRequestLimitException extends RuntimeException {

    private static final long serialVersionUID = -3906338266891937036L;

    public CustomRecipeRequestLimitException() {
        super("You already have 5 requests this month.");
    }

}
