'use strict';
import React, { Component, Image, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native';

import AWSSignature from 'react-native-aws-signature';

import stylesheet from '../tydee-styles/home';

const icon = {
    details: require('image!details'),
    email: require('image!email'),
    location: require('image!location'),
    tydee: require('image!tydee')
};

const tydeeAPI = {
    host: 'https://kmzklf3r5g.execute-api.us-east-1.amazonaws.com/test'
};

//let awsSignature = new AWSSignature();
//
//let credentials = {
//    SecretKey: "VSAcaFCjErRC9JQZYFlsYL1QFpaPkE5qFWqfQ4Mm",
//    AccessKeyId: "AKIAIRYSLTT7UCA35E4Q"
//};

//let dateNow = awsSignature.formatDateTime(Date.now());

//var options = {
//    path: `${tydeeAPI.host}/tydee/queue`,
//    method: 'post',
//    service: 'execute-api',
//    headers: {
//        'X-Amz-Date': dateNow,
//        'host': 'apigateway.us-east-1.amazonaws.com',
//        'Content-Type': 'application/x-amz-json-1.0'
//    },
//    body: '',
//    region: 'us-east-1',
//    credentials
//};
//
//awsSignature.setParams(options);
//
//let authorization = awsSignature.getAuthorizationHeader();

//<View style={styles.searchbar}>
//    <TextInput style={styles.search} placeholder='Pickup Location' />
//</View>

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: 0,
            postResult: undefined,
            result: undefined,
            scene: undefined
        };
    }

    render() {
        const code = {
            0: {
                button: 'Schedule Pickup',
                message: 'Charlestowne Apartments' + '\n' + '50 Creekside Drive NW, Apt 232',
                phase: 'idle',
                status: ''
            },
            1: {
                button: 'Cancel Pickup',
                message: 'Your trash will be picked up' + '\n' + 'Monday January 2' + '\n' + 'Between 6 p.m. - 8 p.m.',
                phase: 'scheduled',
                status: 'SCHEDULED'
            },
            2: {
                button: 'Confirm Tydee Pickup',
                message: 'Your trash will be picked up' + '\n' + 'Monday January 2' + '\n' + 'Between 6 p.m. - 8 p.m.',
                phase: 'enroute',
                status: 'ON OUR WAY'
            },
            3: {
                button: 'Rate your Pickup',
                message: 'Confirm your trash was' + '\n' + 'successfully picked up today' + '\n' + 'and earn Member Points',
                phase: 'complete',
                status: 'ALL TYDEE'
            }
        };

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={icon.tydee} />
                </View>

                <View style={styles.section}>
                    <Image style={styles.background} source={require('image!homeBG')}>
                        <View style={styles.body}>
                            <View style={styles.content}>
                                <View style={styles.status}>
                                    <Text style={this.state.code > 0 ? styles.titleActive : styles.title}>
                                        Pickup Indicator
                                    </Text>
                                    <View style={styles.indicator}>
                                        <View style={this.state.code == 3 ? styles.indicatorActive3 : styles.indicator3}>
                                            <Text style={styles.text}>
                                                {this.state.code == 3 ? code[3].status : ''}
                                            </Text>
                                        </View>
                                        <View style={this.state.code > 1 ? styles.indicatorActive2 : styles.indicator2}>
                                            <Text style={styles.textActive}>
                                                {this.state.code > 1 ? code[2].status : ''}
                                            </Text>
                                        </View>
                                        <View style={this.state.code > 0 ? styles.indicatorActive1 : styles.indicator1}>
                                            <Text style={styles.text}>
                                                {this.state.code > 0 ? code[1].status : ''}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.content}>
                                <View style={styles.action}>
                                    <Text style={styles.message}>
                                        {this.state.code ? code[this.state.code].message : code[0].message}
                                        <Text style={styles.message}>
                                            Profile: {this.props.profile.name} - {this.props.profile.email}
                                        </Text>
                                        <Text style={styles.message}>
                                            Token: {this.props.token.refreshToken} - {this.props.token.tokenType}
                                        </Text>
                                        <Text style={styles.message}>
                                            Result: {this.state.result}
                                        </Text>
                                        <Text style={styles.message}>
                                            Post Result: {this.state.postResult}
                                        </Text>
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.actionButton}
                                    onPress={this._onUpdateQueue(
                                    this.props.delegationToken.Credentials.AccessKeyId,
                                    this.props.delegationToken.Credentials.SecretAccessKey,
                                    this.props.delegationToken.Credentials.SessionToken
                                    )}
                                    >
                                    <Text style={styles.actionText}>
                                        {this.state.code ? code[this.state.code].button : code[0].button}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.content}>
                                <TouchableOpacity style={styles.referral}
                                    //onPress={() => navigator.pop()}
                                    >
                                    <Text style={styles.link}>Refer a friend today!</Text>
                                    <Image style={styles.iconRight} source={require('image!next')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Image>
                </View>


                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button}
                        //onPress={() => navigator.pop()}
                        >
                        <Image source={icon.location} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        //onPress={() => navigator.pop()}
                        >
                        <Image source={icon.details} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderScene() {
        return (
            <View>

            </View>
        );
    }

    renderScheduled() {
        return (
            <View>

            </View>
        );
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(`${tydeeAPI.host}/tydee/queue`)
            .then((response) => {
                this.setState({
                    result: response._bodyText
                });
            })
            .done();
        //fetch(REQUEST_URL)
        //    .then((response) => {
        //        this.setState({
        //            result: response._bodyText
        //        });
        //    })
        //    .done();
        //
        //fetch(REQUEST_URL, {
        //    method: 'POST',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json'
        //    },
        //    body: JSON.stringify({
        //        name: 'Herman'
        //    })
        //}).then(
        //    function (response) {
        //        this.setState({postResult: response._bodyText});
        //    }.bind(this),
        //    function (error) {
        //        console.warn('Something went wrong getting result:', error);
        //    })
        //    .done();
    }

    _onUpdateQueue (access, secret, session) {
        let awsSignature = new AWSSignature();

        let credentials = {
            SecretKey: secret,
            AccessKeyId: access
        };

        let dateNow = awsSignature.formatDateTime(Date.now());

        var options = {
            path: '/',
            method: 'post',
            service: 'dynamodb',
            headers: {
                'X-Amz-Date': dateNow,
                'host': 'dynamodb.us-west-2.amazonaws.com',
                'Content-Type': 'application/x-amz-json-1.0',
                'X-Amz-Target': 'DynamoDB_20120810.PutItem'
            },
            body: '',
            region: 'us-east-1',
            credentials
        };

        awsSignature.setParams(options);

        let authorization = awsSignature.getAuthorizationHeader();

        fetch(`${tydeeAPI.host}/tydee/queue`, {
            method: 'POST',
            headers: {
                'Authorization': authorization.Authorization,
                'X-Amz-Date': dateNow,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "queue": [
                    {
                        "id": 1,
                        "requestor": [{
                            "id": 4,
                            "name": "Teddy Rose",
                            "JobsRequest": 12
                        }],
                        "responder": [{
                            "id": 43,
                            "name": "Jena Cole",
                            "JobsComplete": 43
                        }],
                        "status": "enroute"
                    }
                ]
            })
        })
            .then(
            function (response) {
                    this.setState({
                        postResult: response._bodyText
                    });
                }.bind(this),
            function (error) {
                console.warn('Something went wrong getting result:', error);
            })
            .done();
    }
}

const styles = StyleSheet.create(stylesheet);
