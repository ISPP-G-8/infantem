package com.isppG8.infantem.infantem.auth.email;

import lombok.Data;

@Data
public class EmailDetails {

    private String recipient;
    private String msgBody;
    private String subject;

    public EmailDetails() {

    }

    public EmailDetails(String recipient, String msgBody, String subject) {
        this.recipient = recipient;
        this.msgBody = msgBody;
        this.subject = subject;
    }
}
