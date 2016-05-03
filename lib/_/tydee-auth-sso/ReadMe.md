#Tydee Authorization
This custom module allows the user to authenticate using Facebook or Google. Alternatively, the user can sign up for access through Tydee.

###Features:
 * Facebook Authentication: Facebook Developer API
 * Google Authentication: Google Developer API
 * Tydee Authentication/Sign Up: Amazon Web Services
 
###Sign Up
The Sign Up form requests the following information from the user:
 * Username
 * Password
 * First Name
 * Last Name
 * Address
 * City
 * State
 * Zip
 * Birthday
 
 
##Login
#Facebook
    - getFacebookAuth
    - postFacebookAuth
#Google
    - getGoogleAuth
    - postGoogleAuth
#Tydee
    - getTydeeAuth
    - postTydeeAuth