'use strict';

import React, { Alert, AsyncStorage, AppRegistry, Component, View } from 'react-native';

import Auth0Lock from 'react-native-lock-ios';
import Firebase  from 'firebase';
import FirebaseTokenGenerator from 'firebase-token-generator';
//import Store from 'react-native-store';

import cred from './ignore/credentials';

//const localDB = {
//    'ref_token': Store.model('ref_token'),
//    'user': Store.model('user')
//};

import SignIn from './routes/signin';
import Home from './routes/home';


let ref = new Firebase(_getFirebaseRef());

//-- Auth0
const lock = new Auth0Lock({
    clientId: _getAuth0ClientID(),
    domain: _getAuth0Domain()
});

class tydeeapp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged: undefined,
            profile: undefined,
            ref_token: undefined,
            token: undefined
        };

        this.fetchUserToken = this.fetchUserToken.bind(this);


        //this.itemsRef = new Firebase(_getFirebaseRef()/items)
    }

    componentDidMount() {
        //localDB.ref_token.find().then(resp => this.setState({ref_token: resp}));
    }

    fetchUserToken(ref_token) {
        ref.authWithCustomToken(ref_token, function(error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
                return;
            } else {
                console.log("Authenticated successfully with payload:", authData);

                // now use your firebase reference to save some data for the user!
                var firebase_user_ref = ref.child('users').child(authData.uid);
                firebase_user_ref.push({
                    "text": "I'm logged in!",
                    "date": new Date().getTime()
                });
            }
        });

        this.setState({
            logged: true
        });
    }

    //handleFilter(itemName) {
    //    localDB.auth.find({
    //        where: {
    //            and: [{ auth: { neq: itemName } }, { age: { gte: 5 } }]
    //        },
    //        order: {
    //            age: 'ASC',
    //        }
    //    }).then(resp => this.setState({items: resp}));
    //}

    login() {
        //if (this.state.ref_token)
        //    this.fetchUserToken(this.state.ref_token);

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

            // firebase token: Firebase app configuration -> secrets
            let tokenGenerator = new FirebaseTokenGenerator(_getFirebaseToken());

            // use the token generator to create a new token with the userId
            let ref_token = tokenGenerator.createToken({ uid: profile.userId });

            this.setState({
                profile: profile,
                ref_token: ref_token,
                token: token
            });

            this.fetchUserToken(ref_token)
        });
    }

    render() {
        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <View style={{flex:1}}>
                    {this.state.logged ? this.renderHome() : this.renderSignIn()}
                </View>
            </View>
        );
    }

    renderHome() {
        return <Home profile={this.state.profile} token={this.state.token} ref_token={this.state.ref_token} />;
    }

    renderSignIn() {
        this.login();

        return <SignIn onClick={this.login.bind(this)} />;
    }
}

AppRegistry.registerComponent('tydeeapp', () => tydeeapp);