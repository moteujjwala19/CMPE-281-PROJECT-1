package com.aws.aws_dropbox_um.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AWSStorageConfig {

    @Value("${cloud.aws.credentials.access-key}")
    private String access;
    @Value("${cloud.aws.credentials.secret-key}")
    private String secret;
    @Value("${cloud.aws.region.static}")
    private String region;

    @Bean
    public AmazonS3 generateS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(access,secret);
        return AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(region).build();
    }
    @Bean
    public DynamoDBMapper mapper() {
        return new DynamoDBMapper(config());
    }

    private AmazonDynamoDB config() {
        return AmazonDynamoDBClientBuilder.standard()
                .withEndpointConfiguration(
                        new AwsClientBuilder.EndpointConfiguration( "dynamodb.us-west-1.amazonaws.com","us-west-1"))
                .withCredentials(new AWSStaticCredentialsProvider(
                        new BasicAWSCredentials("AKIA4NLBE7Z3OX44GZUO","58zad7gep75Aw3h5fYAslEWcncb/2Pr2jPbe1leh"))).build();
    }
}
