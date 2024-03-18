package com.tiandtech.mail;

import jakarta.mail.Authenticator;
import jakarta.mail.PasswordAuthentication;

/**
 * 用户名密码验证器
 */
public class UserPassAuthenticator extends Authenticator {

    private final String user;
    private final String pass;

    public UserPassAuthenticator(String user, String pass) {
        this.user = user;
        this.pass = pass;
    }

    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(this.user, this.pass);
    }

}
