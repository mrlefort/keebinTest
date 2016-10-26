/**
 * Created by mrlef on 10/25/2016.
 */

var db = require('./DataBaseCreation.js');
var jwt = require('jsonwebtoken');
var auth = db.Authentication();


var accessToken;

function _getToken(userData, callback)
{
    auth.find({where: {id: 1}}).then(function (data, err)
    {
        if (data !== null) {
            console.log(data.secret);
            secretKey = data.secret;
            createClaim(userData, secretKey);
            callback(accessToken);


        } else {
            console.log(err);
            console.log("could not find any secret");
        }
    })
}


function createClaim(userData, secretKey) {

    var claims =
    {
        sub: userData.id,
        iss: "my server url",
        email: userData.email



    }
    createAccessToken(claims, secretKey);
}




function createAccessToken(claims, secretKey)
{


    console.log(secretKey);
    accessToken = jwt.sign({
        data: claims
    }, secretKey, { expiresIn: 3600 });

    console.log("Token has been created: " + accessToken); //this is what our accessToken looks like.

}








module.exports = {getToken : _getToken};