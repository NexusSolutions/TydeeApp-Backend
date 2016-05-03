'use strict';
import React, { AppRegistry, Component, StyleSheet, Text, View } from 'react-native';
import BaseAuth, {      // sample app
  /* available components */
    Navbar,               // sample navigation bar
    Login,                // sample login view
    Register,             // sample register view
    ForgetPassword,       // sample forget password view
    ResetPassword,        // sample reset password view
    RestrictedPage,       // sample restricted view
  /* available constants  */
    Server,               // sample api end-point
    Host,                 // sample host for api end-point
    Key,                  // sample key for asynstorage
    Style                 // sample styles
} from './lib/react-native-base-authentication-master';

class tydeeapp extends Component {
  render() {
    return (
      <BaseAuth />
    );
  }
}

AppRegistry.registerComponent('tydeeapp', () => tydeeapp);
