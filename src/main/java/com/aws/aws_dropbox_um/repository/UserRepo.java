package com.aws.aws_dropbox_um.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.aws.aws_dropbox_um.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class UserRepo {

    @Autowired
    private DynamoDBMapper mapper;

    public void saveUser(User user) {
        mapper.save(user);
        //return user;
    }

    public List<User> getUserDatabyID(String userId) {
       //return mapper.load(User.class,userId);

        String partitionKey = "userNm";
        List<User> dbData = new ArrayList<>();

        if (!userId.equals("ujwalabalbhim.mote@sjsu.edu"))
        {
            Map<String, AttributeValue> eav = new HashMap<>();
            eav.put(":v1", new AttributeValue().withS(userId));
                    DynamoDBQueryExpression<User> queryExpression = new DynamoDBQueryExpression<User>()
                .withIndexName("userNm-index").withConsistentRead(false)
                .withKeyConditionExpression("userNm = :v1")
                .withExpressionAttributeValues(eav);
             dbData = mapper.query(User.class, queryExpression);

        }
        else
        {
            DynamoDBScanExpression queryExpression = new DynamoDBScanExpression();
            dbData = (List<User> )mapper.scan(User.class, queryExpression);
        }
////        DynamoDBQueryExpression<User> queryExpression = new DynamoDBQueryExpression<User>()
////                .withIndexName("userNm-index").withConsistentRead(false)
////                .withKeyConditionExpression("userNm = :v1")
////                .withExpressionAttributeValues(eav);
////        DynamoDBQueryExpression<User> queryExpression = new DynamoDBQueryExpression<User>();
//        DynamoDBScanExpression queryExpression = new DynamoDBScanExpression();
//
////                .withIndexName("userNm-index").withConsistentRead(false)
////                .withKeyConditionExpression("1 = 1");
////                .withExpressionAttributeValues(eav);
//        List<User> dbData = (List<User> )mapper.scan(User.class, queryExpression);
//       // List<User> dbData1 = mapper.load()
        return dbData;
    }

    public void delete(String id) {
        User user = new User();
        user.setUserId(id);
        mapper.delete(user);
    }

    public void update(User user) {
        mapper.delete(user);
        mapper.save(user);
    }
}
