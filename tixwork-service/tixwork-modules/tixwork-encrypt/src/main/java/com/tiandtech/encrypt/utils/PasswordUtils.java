package com.tiandtech.encrypt.utils;

import cn.hutool.core.text.PasswdStrength;
import cn.hutool.core.util.RandomUtil;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PasswordUtils {

    public static String PASSWORD_STR = "123456789abcdefghjkmnpqrstwxyzABCDEFGHJKMNPQRSTWXYZ!#*";

    /**
     * 随机一个6位的密码
     */
    public static String randomPassword() {
        return RandomUtil.randomString(PASSWORD_STR, 6);
    }

    public static boolean isEasyPassword(String password) {
        return PasswdStrength.PASSWD_LEVEL.EASY == PasswdStrength.getLevel(password);
    }

    //    /**
//     * 生成BCryptPasswordEncoder密码
//     *
//     * @param password 密码
//     * @return 加密字符串
//     */
//    public static String encryptPassword(String password) {
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        return passwordEncoder.encode(password);
//    }

}
