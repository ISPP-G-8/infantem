package com.isppG8.infantem.infantem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class InfantemApplication {

	public static void main(String[] args) {

		String profile = System.getenv("SPRING_PROFILES_ACTIVE");
		if(profile == null){
			Dotenv dotenv = Dotenv.load();
			System.setProperty("spring.profiles.active", dotenv.get("SPRING_PROFILES_ACTIVE"));
		}else{
			System.setProperty("spring.profiles.active", profile);
		}
		SpringApplication.run(InfantemApplication.class, args);
	}

}
