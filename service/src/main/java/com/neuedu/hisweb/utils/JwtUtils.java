package com.neuedu.hisweb.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.neuedu.hisweb.entity.Customer;
import com.neuedu.hisweb.entity.User;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public class JwtUtils {
    public static final long EXPIRE_TIME = 60L* 60 * 1000*25*365;

    public static final String SECRET = "SECRET";

    @Value("${secretkey}")
    private static final String SECRETKEY = null;

    //签发token
    public static String sign(Object object){
        Date expireDate = new Date(System.currentTimeMillis() + EXPIRE_TIME);
        if (object instanceof Customer customer){
            return JWT.create()
                    .withClaim("id", customer.getId())
                    .withClaim("secretkey",SECRETKEY)
                    .withExpiresAt(expireDate)
                    .sign(Algorithm.HMAC256(SECRET));
        }
        User user = (User) object;
        return JWT.create()
                .withClaim("realName", user.getRealName())
                .withClaim("userName", user.getUserName())
                .withClaim("id", user.getId())
                .withClaim("secretkey",SECRETKEY)
                .withExpiresAt(expireDate)
                .sign(Algorithm.HMAC256(SECRET));
    }

    //校验token
    public static boolean verify(String token){
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
            DecodedJWT decodedJWT  = verifier.verify(token);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    //获取token内的携带的用户名信息
    public static String getUserNameByToken(String token){
        DecodedJWT decodedJWT = JWT.decode(token);
        return decodedJWT.getClaim("userName").asString();
    }

    //获取token内的携带的用户信息
    public static Object getUserByToken(String token){
        DecodedJWT decodedJWT = JWT.decode(token);
        if (decodedJWT.getClaim("userName").isNull()){
            Customer customer = new Customer();
            customer.setId(customer.getId());
            return customer;
        }
        User user = new User();
        user.setUserName(decodedJWT.getClaim("userName").asString());
        user.setRealName(decodedJWT.getClaim("realName").asString());
        user.setId(decodedJWT.getClaim("id").asInt());
        return user;
    }


}
