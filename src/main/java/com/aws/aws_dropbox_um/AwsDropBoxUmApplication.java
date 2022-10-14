package com.aws.aws_dropbox_um;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class AwsDropBoxUmApplication {

    public static void main(String[] args) {
        SpringApplication.run(AwsDropBoxUmApplication.class, args);
    }

}
