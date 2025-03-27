package com.isppG8.infantem.infantem.auth.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageResponse {

    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "MessageResponse [message=" + message + "]";
    }

}
