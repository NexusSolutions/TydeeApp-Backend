'use strict';

export const credentials = {
    auth0Client: 'https://tydeetest.firebaseio.com/',
    auth0Domain: 'UwBAt47h9bVvGRdsixWZBA6EF56L6VF1',
    firebaseRef: 'hermanowens.auth0.com',
    firebaseToken: 'Ek5YL8FGOr5JXKaAgHazNPk7g2G54eWisU1sH4L6'
};

window._getFirebaseRef = function() {
    return "https://tydeetest.firebaseio.com/";
};

window._getAuth0ClientID = function() {
    return "UwBAt47h9bVvGRdsixWZBA6EF56L6VF1";
};

window._getAuth0Domain = function() {
    return "hermanowens.auth0.com";
};

window._getFirebaseToken = function() {
    return "Ek5YL8FGOr5JXKaAgHazNPk7g2G54eWisU1sH4L6";
}