package ksu.bitirmeserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


//@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
@SpringBootApplication
public class BitirmeServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BitirmeServerApplication.class, args);
	}


}
