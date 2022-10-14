
global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');


export const apiUrl = {
    endpointURL: "http://localhost:8080/aws"
}

export const service = {
    deleteFile,
    getUserData,
    uploadFile,
    getUserDetails,

}


function getUserData(userName) {
    debugger;
    console.log("user"+userName);
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiUrl.endpointURL}/getUserData/${userName}`, requestOption).then(res => {
        debugger;
        //alert("eeeee");
        console.log(res);
        return res.json();
    })
}

function getUserDetails() {
    debugger;
    // cognito user pool data
    const poolData = {
        UserPoolId: 'us-west-1_ZRMHuklL',
        ClientId: '4r0coa7tau6v2c304uiuhgerjh',
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cogntoUser = userPool.getCurrentUser();
    if (cogntoUser != null) {
        cogntoUser.getSession(function(err, session) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }

            cogntoUser.getUserAttributes(function(err, attributes) {
                if (err){
                    alert(err);
                } else {
                    console.log(attributes);
                }
            });


        });
    }
}


function deleteFile(fileName,id) {
    debugger;
    const requestOption = {
        method: 'DELETE',
        body: JSON.stringify({
            "deleteFile": fileName,
            "userId": id
        }),
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiUrl.endpointURL}/delete/${id}`, requestOption)
}

function uploadFile(inputFile, userData, description) {
    const data = new FormData();
    debugger;
    data.append('userName', userData);
    data.append('inputFile', inputFile);
    data.append('description', description);
    const requestOption = {
        method: 'POST',
        body: data,
    }
    return fetch(`${apiUrl.endpointURL}/upload`, requestOption).then(res => {
      console.log(res);
        return res;
    })
}





