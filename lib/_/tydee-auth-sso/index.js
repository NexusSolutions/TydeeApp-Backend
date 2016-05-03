'use strict';

import React, {
    Alert,
    Component,
    Image,
    Navigator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import Facebook from './routes/facebook';
import Google from './routes/google';
import Server, { tydee as OAuthTydee, facebook as OAuthFacebook, google as OAuthGoogle } from './server';
import stylesheet from './stylesheets/client';

export { Facebook, Google, Server, OAuthTydee, OAuthFacebook, OAuthGoogle };

const icon = {
    facebook: require('image!facebook'),
    google: require('image!google'),
    email: require('image!email')
};

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scene: undefined
        };
    }

    render() {
        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <View style={{flex:1}}>
                    {this.state.scene === 'facebook' ? this.renderFacebook() : this.state.scene === 'google' ? this.renderGoogle() : this.renderScene()}
                </View>
            </View>
        );
    }

    renderScene() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={require('image!signInTydee')} />
                    <Image style={styles.introBackground} source={require('image!signInSwypee')}>
                        <Text style={styles.introText}>Take out the trash with just a tap. Tydee is the quick and simple way to free your home of trash without ever leaving it.</Text>
                    </Image>
                    <TouchableHighlight
                        onPress={() => this.setState({scene: 'facebook'})}
                        style={[styles.button, styles.buttonFacebook]}
                        underlayColor={stylesheet.buttonFacebook.backgroundColor}>
                        <View style={styles.buttonInner}>
                            <Image style={styles.icon} source={icon.facebook} />
                            <View style={styles.divider}></View>
                            <Text style={[styles.text, styles.textIcon]}>{`Log In with Facebook`}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.setState({scene: 'google'})}
                        style={[styles.button, styles.buttonGoogle]}
                        underlayColor={stylesheet.buttonGoogle.backgroundColor}>
                        <View style={styles.buttonInner}>
                            <Image style={styles.icon} source={icon.google} />
                            <View style={styles.divider}></View>
                            <Text style={[styles.text, styles.textIcon]}>{`Log In with Google`}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.setState({scene: 'email'})}
                        style={[styles.button, styles.buttonEmail]}
                        underlayColor={stylesheet.buttonEmail.backgroundColor}>
                        <View style={styles.buttonInner}>
                            <Image style={styles.icon} source={icon.email} />
                            <View style={styles.divider}></View>
                            <Text style={[styles.text, styles.textIcon]}>{`Log In with Email`}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.setState({scene: 'signup'})}
                        style={styles.button}
                        underlayColor={stylesheet.button.backgroundColor}>
                        <Text style={styles.text}>{`Sign Up`}</Text>
                    </TouchableHighlight>
                    <Text style={styles.compliantText}>By signing up, I agree to Tydee’s Terms of Service, Privacy Policy, Guest Refund Policy, and Host Guarantee Terms.</Text>
                </View>
            </ScrollView>
        );
    }

    renderFacebook() {
        return <Facebook />;
    }

    renderGoogle() {
        return <Google />;
    }
}

const styles = StyleSheet.create(stylesheet);