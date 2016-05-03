'use strict';
import React, { AppRegistry, Component, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

//import Auth0Lock from 'react-native-lock-ios';
//import Firebase from "firebase";

import stylesheet from './lib/tydee-styles/default';

//import Welcome from './lib/tydee-auth0/index';
//import Home from './lib/tydee-home/index';

//var tydeeFire = new Firebase("https://tydeetest.firebaseio.com/");

//-- Auth0
//const lock = new Auth0Lock({
//    clientId: "UwBAt47h9bVvGRdsixWZBA6EF56L6VF1",
//    domain: "hermanowens.auth0.com"
//});

//const Realm = require('realm');

//var REQUEST_URL = 'https://t4g33mjsp1.execute-api.us-east-1.amazonaws.com/test/auth';

//<View style={styles.container}>
//    <HeaderView/>
//    <Text>Welcome {this.state.profile.name}</Text>
//    <Text>Your email is: {this.state.profile.email}</Text>
//</View>

//tydeeFire.child("location/city").on("value", function(snapshot) {
//    alert(snapshot.val());  // Alerts "San Francisco"
//});

//tydeeFire.createUser({
//    email    : "bobtony@firebase.com",
//    password : "correcthorsebatterystaple"
//}, function(error, userData) {
//    if (error) {
//        console.log("Error creating user:", error);
//    } else {
//        console.log("Successfully created user account with uid:", userData.uid);
//    }
//});

class tydeeapp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged: false,
            scene: undefined,
            postResult: undefined,
            profile: undefined,
            result: undefined,
            token: undefined,
            delegationToken: undefined
        }
    }

    render() {
        if (this.state.logged && this.state.delegationToken) {
            switch (this.state.scene) {
                case "sign-up":
                    break;
                default:
                    return (<Home profile={this.state.profile} token={this.state.token} delegationToken={this.state.delegationToken} />);
                    break;
            }
            //var realm = new Realm({schema: [{name: 'Dog', properties: {name: 'string'}}]});
            //
            //realm.write(()=> {
            //    realm.create('Dog', ['Rex']);
            //});

            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        Count of Dogs in Realm: {realm.objects('Dog').length}
                    </Text>
                    <Text>Welcome {this.state.profile.name}</Text>
                    <Text>Your email is: {this.state.profile.email}</Text>
                    <Text>Your access token is: {this.state.token.accessToken}</Text>
                    <Text>Your ID token is: {this.state.token.idToken}</Text>
                    <Text>Your refresh token is: {this.state.token.refreshToken}</Text>
                    <Text>Your token type is: {this.state.token.tokenType}</Text>
                    <Text style={styles.welcome}>{this.state.result}</Text>
                    <Text style={styles.welcome}>{this.state.postResult}</Text>
                </View>
            );
        }

        this._onShowLock();

        return (
            <Welcome onClick={this._onShowLock} />
        );
    }

    //componentDidMount() {
    //    //this.fetchData();
    //    this._onGetDelegationToken();
    //}

    //fetchData() {
    //    fetch(REQUEST_URL)
    //        .then((response) => {
    //            this.setState({
    //                result: response._bodyText
    //            });
    //        })
    //        .done();
    //
    //    fetch(REQUEST_URL, {
    //        method: 'POST',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify({
    //            name: 'Herman'
    //        })
    //    }).then(
    //        function (response) {
    //            this.setState({postResult: response._bodyText});
    //        }.bind(this),
    //        function (error) {
    //            console.warn('Something went wrong getting result:', error);
    //        })
    //        .done();
    //}

    //_onGetOptionsForRole(isAdmin, token) {
    //    if(isAdmin) {
    //        // TODO: update roles and principals based upon your account settings.
    //        return {
    //            "id_token": token,
    //            "role":"arn:aws:iam::694161033111:role/tydee-auth0-api-role",
    //            "principal": "arn:aws:iam::694161033111:saml-provider/tydee-auth0-provider"
    //
    //        };
    //    }
    //    else {
    //        return {
    //            "id_token": token,
    //            "role":"arn:aws:iam::012345678901:role/auth0-api-social-role",
    //            "principal": "arn:aws:iam::012345678901:saml-provider/auth0"
    //        };
    //    }
    //}

    //_onGetDelegationToken(id_token) {
    //    fetch('https://hermanowens.auth0.com/delegation', {
    //        method: 'POST',
    //        headers: {
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify ({
    //            "client_id": "UwBAt47h9bVvGRdsixWZBA6EF56L6VF1", // Tydee
    //            "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
    //            "id_token": id_token,
    //            "scope" : "openid",
    //            "api_type": "aws",
    //            "role" : "arn:aws:iam::694161033111:role/tydee-auth0-api-role",
    //            "principal" : "arn:aws:iam::694161033111:saml-provider/tydee-auth0-provider"
    //        })
    //    }).then(
    //        function (response) {
    //            this.setState({
    //                delegationToken: JSON.parse(response._bodyText)
    //            });
    //        }.bind(this),
    //        function (error) {
    //            console.warn('Something went wrong getting the delegation token', error);
    //        })
    //        .done();
    //}

    _onShowLock() {
        lock.show({
            authParams: {
                scope: "openid email offline_access touchid"
            },
            closable: true
        }, (err, profile, token) => {
            if (err) {
                console.log(err);
                return;
            }

            this.setState({
                logged: true,
                profile: profile,
                token: token
            });

            //this._onGetDelegationToken(token.idToken);
        });
    }

    _onLogout() {
        this.setState({
            logged: false
        });
    }
}

const styles = StyleSheet.create(stylesheet);

AppRegistry.registerComponent('tydeeapp', () => tydeeapp);
