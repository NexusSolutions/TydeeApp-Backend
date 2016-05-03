'use strict';
import React, { Component, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
const styles = require('../stylesheets/action_button');
const constants = styles.constants;

class ActionButton extends Component {
    render() {
        return (
            <View style={styles.action}>
                <TouchableHighlight
                    underlayColor={constants.actionColor}
                    onPress={this.props.onPress}>
                    <Text style={styles.actionText}>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = ActionButton;