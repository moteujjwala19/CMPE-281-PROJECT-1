package com.aws.aws_dropbox_um.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
@Slf4j
public class AWSStorageService {

    @Value("${application.bucket.name}")
    private String bucketNm;

    @Autowired
    private AmazonS3 s3Client;

    public String uploadFile(MultipartFile file) {
        File finalFile = convertMultipartToFile(file);
       s3Client.putObject(bucketNm,file.getOriginalFilename(),finalFile );
        finalFile.delete();
       return "uploaded successfully";
    }

    public String modifyFile(MultipartFile file) {
        s3Client.deleteObject(bucketNm,file.getOriginalFilename());
        File finalFile = convertMultipartToFile(file);
        s3Client.putObject(bucketNm,file.getOriginalFilename(),finalFile );
        finalFile.delete();
        return "modified successfully";
    }
    private File convertMultipartToFile(MultipartFile file) {
        File output = new File(file.getOriginalFilename());
        try {
            FileOutputStream fout = new FileOutputStream(output);
            fout.write(file.getBytes());
        }catch(Exception e){
            log.error("error in file conversion ....");
        }
        return output;
    }

    public byte[] downloadFile(String fileNm) {
        S3Object s3Object = s3Client.getObject(bucketNm,fileNm);
        S3ObjectInputStream ip = s3Object.getObjectContent();
        try {
            byte[] result = IOUtils.toByteArray(ip);
            return result;
        } catch (IOException e) {
            log.error("error while downloading file");
        }
        return null;
    }

    public String deleteFile(String fileName) {
        s3Client.deleteObject(bucketNm,fileName);
        return "deleted successfully";
    }




}
