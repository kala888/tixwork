package com.tiandtech.mail;

import com.tiandtech.core.service.MailService;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service("mailService")
public class MailServiceImpl implements MailService {
    @Override
    @Async()
    public void sendEmail(String to, String subject, String content) {
        MailUtils.send(to, subject, content, false);
    }
}
