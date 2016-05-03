'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import stylesheet from '../stylesheets/signin';

class SignIn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('image!signInTydee')}/>
                    <Text style={styles.title}>Welcome to the Tydee App</Text>
                </View>
                <Text style={styles.message}>Take out the trash with just a tap.</Text>
                <Text style={styles.message}>Tydee is the quick and simple way to</Text>
                <Text style={styles.message}>free your home of trash without</Text>
                <Text style={styles.message}>ever leaving it.</Text>
                <Text style={styles.message}></Text>
                <Text style={styles.message}>You're not currently logged in. Click the <Text style={{fontWeight: 'bold'}}>"Unlock"</Text> button below to open the
                    application.</Text>
                <View style={styles.actionContainer}>
                    <TouchableHighlight style={styles.actionButton} onPress={ () => this.props.onClick()}>
                        <Text style={styles.actionButtonText}>Unlock</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create(stylesheet);

module.exports = SignIn;