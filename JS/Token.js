/**
 * Created by mrlef on 10/25/2016.
 */

var db = require('./DataBaseCreation.js');
var jwt = require('jsonwebtoken');
var auth = db.Authentication();



function _getToken(userData)
{
    auth.find({where: {id: 1}}).then(function (data, err)
    {
        if (data !== null) {
            console.log(data.secret);
            secretKey = data.secret;
            createClaim(userData, secretKey);

        } else {
            console.log(err);
            console.log("could not find any secret");
        }
    })
}


function createToken(claims, secretKey, callback)
{


    console.log(secretKey);
    var token = jwt.sign({
        data: claims
    }, secretKey, { expiresIn: 3600 });

    console.log(token); //this is what our token looks like.
    callback(token);
}

var createClaim = function (userData, secretKey) {

    var claims =
    {
        sub: userData.id,
        iss: "vores_url",
        email: userData.email



    }
    createToken(claims, secretKey);
}




module.exports = {getToken : _getToken};