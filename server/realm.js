'use strict';
import Realm from 'realm';

const Auth = {
    name: 'Auth',
    properties: {
        token: {type: 'string'},
        uid: {type: 'string'}
    }
};

const User = {
    name: 'User',
    properties: {
        name: {type: 'string'},
        birthday: {type: 'date', optional: true},
        picture: {type: 'data', optional: true},
        auth: {type: 'list', objectType: 'Auth'}
    }
};

export let realm = new Realm({schema: [Auth, User], schemaVersion: 2});
