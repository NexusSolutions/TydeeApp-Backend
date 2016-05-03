'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    TouchableHighlight
} from 'react-native';

import Auth0Lock from 'react-native-lock-ios';
import cred from './ignore/credentials';
import Firebase  from 'firebase';
import FirebaseTokenGenerator from 'firebase-token-generator';

// your firebase reference (from credentials.js)
let ref = new Firebase(_getFirebaseRef());

// your custom Auth0 Lock
const lock = new Auth0Lock({
    clientId: _getAuth0ClientID(),
    domain: _getAuth0Domain()
});

export default class extends Component {
    constructor(props) {
        super(props);
    }

    _login() {
        lock.show({
            authParams: {
                scope: "openid email offline_access touchid"
            },
            closable: true
        }, (err, profile, token) => {
            if (err) {
                console.log(err);
            }

            // firebase token: Firebase app configuration -> secrets
            var tokenGenerator = new FirebaseTokenGenerator(_getFirebaseToken());

            // use the token generator to create a new token with the userId
            var ref_token = tokenGenerator.createToken({ uid: profile.userId });

            ref.authWithCustomToken(ref_token, function(error, authData) {
                if (error) {
                    console.log('Login Failed!');
                } else {
                    console.log('Login Successful!');

                    // now use your firebase reference to save some data for the user!
                    var firebase_user_ref = ref.child('users').child(authData.uid);
                    firebase_user_ref.push({
                        "text": "I'm logged in!",
                        "date": new Date().getTime()
                    });
                }
            });
        });
    }

    render() {
        return (
            <TouchableHighlight style={styles.button} onPress={this._login}>
                <Text style={styles.text}>Login</Text>
            </TouchableHighlight>
        );
    }
}

var styles = StyleSheet.create({
    button: {
        marginTop: 40
    },
    text: {
        color: 'black',
        textAlign: 'center'
    }
});