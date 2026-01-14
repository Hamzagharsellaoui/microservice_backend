package com.example.demo;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import com.example.demo.entity.Outil;
import com.example.demo.service.IOutilService;

@SpringBootApplication
@EnableDiscoveryClient
public class OutilServiceApplication{

	public static void main(String[] args) {
		SpringApplication.run(OutilServiceApplication.class, args);
	}
}
