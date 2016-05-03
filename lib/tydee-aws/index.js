import React from 'react-native';
//import Cognito from 'react-native-cognito';
//import LoginStore from '../stores/LoginStore';
//
//let region = 'us-east-1';
//let identityPoolId = '';
//
//class Demo extends React.Component {
//  constructor() {
//    // Load login credentials from flux store.
//    this.state = LoginStore.getState();
//
//    // Provide credentials to Cognito.
//    Cognito.initCredentialsProvider(
//        identityPoolId,
//        this.state.credentials.token, // <- Facebook access token
//        region);
//
//    // Sync data
//    Cognito.syncData('testDataset', 'hello', 'world', (err) => {
//      // callback
//      // handle errors etc
//    });
//  }
//}

import AWSSignature from 'react-native-aws-signature';

var awsSignature = new AWSSignature();

let credentials = {
    SecretKey: 'VSAcaFCjErRC9JQZYFlsYL1QFpaPkE5qFWqfQ4Mm',
    AccessKeyId: 'AKIAIRYSLTT7UCA35E4Q'
};

let requestOptions = {"RequestItems": {
    "highscores": {
        "Keys": [
            {"name":{"S":"Dave"}},
            {"name":{"S":"John"}},
            {"name":{"S":"Jane"}},
        ],
        "ProjectionExpression": "score"
    }
}};

const options = {
    path: '?Param2=value2&Param1=value1',
    method: 'get',
    service: 'dynamodb',
    headers: {
        'X-Amz-Date': awsSignature.formatDateTime(Date.toISOString()),
        'host': 'dynamodb.us-east-1.amazonaws.com'
    },
    region: 'us-east-1',
    body: requestOptions,
    credentials
};

awsSignature.setParams(options);
var signature = awsSignature.getSignature();
var authorization = awsSignature.getAuthorizationHeader();

console.log(authorization);
console.log(signature);

/*let s3 = new AWS.S3();
 s3.createBucket({Bucket: 'myBucket'}, function() {
 const params = {Bucket: 'myBucket', Key: 'myKey', Body: 'Hello'};

 s3.putObject(params, function(err,data) {
 if (err)
 console.log(err);
 else
 console.log("Successfully uploaded data to myBucket/myKey");
 });
 });*/