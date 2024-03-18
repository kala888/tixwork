package com.tiandtech.core.service;

public interface MailService {
    void sendEmail(String to, String subject, String content);
}
