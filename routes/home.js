'use strict';

import React, {
    Alert,
    AlertIOS,
    Component,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import cred from '../ignore/credentials';

let ref = new Firebase(_getFirebaseRef());

import stylesheet from '../stylesheets/home';

const icon = {
    details: require('image!details'),
    email: require('image!email'),
    location: require('image!location'),
    tydee: require('image!tydee')
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: 0,
            postResult: undefined,
            result: undefined,
            scene: undefined
        };

        this.queueRef = new Firebase(_getFirebaseRef()+'/queue');
    }

    listenForQueue(queueRef) {
        queueRef.on('value', (snap) => {
            // get children as an array
            var queue = [];
            snap.forEach((child) => {
                queue.push({
                    title: child.val().title,
                    _key: child.key()
                });
            });

            //this.setState({
            //    dataSource: this.state.dataSource.cloneWithRows(queue)
            //});
        });
    }

    componentDidMount() {
        this.listenForQueue(this.queueRef);
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
                                                  onPress={() => this.changeStatus()}
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

    fetchStatus() {

    }

    updateQueue() {
        console.log("Authenticated successfully with payload:");

        this.queueRef.push({
            "address": {
                "complex": "Present",
                "street": "123 Gifts for Everyone",
                "city": "Atlanta",
                "state": "GA",
                "zip": "30304"
            },
            "status": 2,
            "tydeeId": this.props.profile.userId
        });

        //"address": {
        //    ".validate": "newData.hasChildren(['complex', 'street', 'unit', 'city', 'state', 'zip']) && auth != null",
        //        ".write": "newData.val() != null || (auth != null)",
        //        "complex": { ".validate": "newData.isString()" },
        //    "street": { ".validate": "newData.isString()" },
        //    "unit": {".validate": "newData.isString()" },
        //    "city": { ".validate": "newData.isString()" },
        //    "state": { ".validate": "newData.isString()" },
        //    "zip": { ".validate": "newData.isString()" }
        //},
        //"status": {".validate": "newData.isNumber() && (newData.val() == 0 || newData.val() == 1 || newData.val() == 2 || newData.val() == 3)"},
        //"tydeeId": {".validate": "newData.isString()"}

        //ref.authWithCustomToken(ref_token, function(error, authData) {
        //    if (error) {
        //        console.log("Authentication Failed!", error);
        //        return;
        //    } else {
        //        console.log("Authenticated successfully with payload:", authData);
        //
        //        // now use your firebase reference to save some data for the user!
        //        var firebase_queue_ref = ref.child('queue');
        //        firebase_queue_ref
        //    }
        //});

        this.setState({
            logged: true
        });
    }

    changeStatus() {
        this.updateQueue(this.props.ref_token, this.props.authData);
    }

    renderProfile() {

    }
}

var styles = StyleSheet.create(stylesheet);

module.exports = Home;