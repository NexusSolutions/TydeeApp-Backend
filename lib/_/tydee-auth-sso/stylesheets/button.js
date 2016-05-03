'use strict';
import { PixelRatio, StyleSheet } from 'react-native'

module.exports = StyleSheet.create({
    button: {
        alignSelf: 'stretch',
        borderColor: '#979797',
        borderRadius: 25,
        borderWidth: StyleSheet.hairlineWidth,
        height: 50,
        marginHorizontal: 10,
        marginVertical: 5
    },
    buttonEmail: {
        backgroundColor: '#258902'
    },
    buttonFacebook: {
        backgroundColor: '#3B5998'
    },
    buttonGoogle: {
        backgroundColor: '#DC4E41'
    },
    container: {
        flexDirection: 'row',
        flex: 1
    },
    icon: {
        backgroundColor: 'transparent',
        marginHorizontal: 14,
        marginVertical: 14
    },
    divider: {
        width: 1/PixelRatio.get(),
        borderRightColor: '#fff',
        borderRightWidth: StyleSheet.hairlineWidth,
        marginVertical: 4
    },
    text: {
        backgroundColor: 'transparent',
        color: '#333333',
        flex: 1,
        fontSize: 20,
        marginVertical: 12,
        textAlign: 'center'
    },
    textIcon: {
        color: '#fff'
    }
});