package com.merrill.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 14:53
 * Description:
 */
public class Token {

    /**
     * 设置过期时间为15分钟
     */
    public static final long EXPIRE_TIME = 15 * 60 * 1000;

    /**
     * token私钥
     */
    public static final String TOKEN_SECRET = "169dea80-2725-446e-b10b-369c9515797e";

    /**
     * 生成签名，15分钟过期
     *
     * @param id 用户id
     * @param password 用户密码
     * @return 加密后的token
     */
    public static String sign(Long id, String password){
        try{
            //过期时间
            Date date = new Date(System.currentTimeMillis() + EXPIRE_TIME);
            //私钥以及加密算法
            Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRET);
            //设置头部信息
            Map<String, Object> header = new HashMap<>(2);
            header.put("typ", "JWT");
            header.put("alg", "HS256");
            //附带name，id信息，生成签名
            return JWT.create()
                    .withHeader(header)
                    .withClaim("id", id)
                    .withClaim("password", password)
                    .withExpiresAt(date)
                    .sign(algorithm);
        } catch (Exception e){
            return null;
        }
    }


    public static boolean verify(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            verifier.verify(token);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
