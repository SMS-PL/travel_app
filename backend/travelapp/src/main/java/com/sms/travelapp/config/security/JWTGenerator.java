package com.sms.travelapp.config.security;



import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import static com.sms.travelapp.config.security.SecurityConstants.JWT_EXPIRATION;
import static com.sms.travelapp.config.security.SecurityConstants.JWT_SECRET;


@Component
public class JWTGenerator {
    public String generateToken(Authentication authentication){
        String username = authentication.getName();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities(); // Pobierz role użytkownika

        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + JWT_EXPIRATION);


        String role = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .filter(r -> r.equals("ROLE_ADMIN"))
                .findFirst()
                .orElse("ROLE_USER");

        String token = Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();

        return token;
    }
    public String getUsernameFromJwt(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token);
            return true;
        }catch (Exception ex){
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
        }
    }
}
