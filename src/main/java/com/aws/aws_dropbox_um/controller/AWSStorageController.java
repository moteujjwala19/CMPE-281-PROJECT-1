package com.aws.aws_dropbox_um.controller;

import com.aws.aws_dropbox_um.entity.User;
import com.aws.aws_dropbox_um.repository.UserRepo;
import com.aws.aws_dropbox_um.service.AWSStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/aws")
@CrossOrigin(origins = "*")

public class AWSStorageController {

    @Autowired
    private AWSStorageService service;

    @Autowired
    private UserRepo repo;
    Date date = new Date();
    @PostMapping("/upload")
    public String uploadFile(@RequestParam (value= "inputFile")MultipartFile file,
                             @RequestParam (value= "userName")String username,
                             @RequestParam (value= "description") String description) {
        List<User> dataLst = repo.getUserDatabyID(username);
        User user = new User();
        user.setFileNm(file.getOriginalFilename());
        user.setDesc(description);
        user.setUserNm(username);
        user.setCreatedDt(new Timestamp(date.getTime()).toString());
        user.setModifiedDt(new Timestamp(date.getTime()).toString());
        for (User user1: dataLst)
        {
            if (user1.getFileNm().equals(file.getOriginalFilename()))
            {
                user.setUserId(user1.getUserId());
                user.setCreatedDt(user1.getCreatedDt());
                service.modifyFile(file);
                break;
            }
        }
        repo.saveUser(user);
        return service.uploadFile(file);
    }

    @PostMapping("/modify")
   /* public String modifyFile(@RequestParam (value= "file")MultipartFile file) {
        User user = new User();
        user.setFileNm(file.getOriginalFilename());
        user.setDesc("abc");
        user.setUserNm("123");
        user.setModifiedDt(new Timestamp(date.getTime()).toString());
        return service.modifyFile(file);
    }*/

    @GetMapping("/download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName) {
        byte[] result = service.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(result);
        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + fileName + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable String id) {
        repo.delete(id);
        return new ResponseEntity<>(service.deleteFile(id), HttpStatus.OK);
    }

    @GetMapping("/getUserData/{userName}")
    public ResponseEntity<List<User>> getData(@PathVariable String userName) {
       System.out.println("fffff");
       List<User> data = repo.getUserDatabyID(userName);
       return new ResponseEntity<>(data, HttpStatus.OK);
    }

}
