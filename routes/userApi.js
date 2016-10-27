var express = require('express');
var router = express.Router();
var facade = require('../JS/DataBaseFacade.js');
var bcrypt = require('bcryptjs');
var Token = require('../JS/Token.js');
var jwt = require('jsonwebtoken');
var Secret = require('../JS/Secret.js');
var User = require('../JS/User.js');


//Deletes a user by email
router.delete("/user/:email", function(req, res)
{
    console.log("param: " + req.params.email)
    facade.userDelete(req.params.email, function(status)
    {
        if(status !== false)
        {
            res.status(200).send();
        }
        else
        {
            res.status(500).send();
        }
    });
});
//New User
router.post("/user/new", function (req, res, next)
    {
        var salt = bcrypt.genSaltSync(12);
        var pw = bcrypt.hashSync(req.body.password, salt);
        var userToSave =
        {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "role": req.body.roleId,
            "birthday": new Date(req.body.birthday),
            "sex": req.body.sex,
            "password": pw
        }
        facade.createUser(userToSave.firstName, userToSave.lastName, userToSave.email, userToSave.role, userToSave.birthday, userToSave.sex, userToSave.password, function (status)
            {
                if (status === true)
                {
                    res.status(200).send();
                }
                else
                {
                    res.status(500).send();
                }
            }
        );
    }
);

//Get user by email
router.get("/user/:email", function (req, res, next)
    {
        facade.userGet(req.params.email, function (data)
            {
                if (data !== false)
                {
                    res.writeHead(200, {"Content-Type": "application/json"});

                    res.end(JSON.stringify(data));
                }
                else
                {
                    res.status(500).send();
                }
            }
        );
    }
);

//Edit a user expects the full input
router.put("/user/:email", function (req, res, next)
    {
        var salt = bcrypt.genSaltSync(10);
        var pw = bcrypt.hashSync(req.body.password, salt);
        var userToSave =
        {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "role": req.body.role,
            "birthday": new Date(req.body.birthday),
            "sex": req.body.sex,
            "password" : pw
        }
        facade.userPut(req.body.email, userToSave, function (status)
            {
                if (status === true)
                {
                    delete userToSave.password;
                    res.write(JSON.stringify(userToSave));
                    res.status(200).send();
                }
                else
                {
                    res.status(500).send();
                }
            }
        );

    }
);

//creates a new link between the given customers email and the coffeshops email (can do it with full user
// and coffeShop objects too, but this info will be available in client, and will save network traffic
/*
Example JSON:
 {
    "userEmail" : "lars1@gmail.com",
    "coffeeShopEmail" : "a@a.dk"
 }
 */
router.post("/coffeeshopuser/new", function(req,res,next)
{
    var coffeeShopUser = req.body.userEmail;
    var coffeeShop = req.body.coffeeShopEmail;

    facade.addCoffeeShopUser(coffeeShopUser, coffeeShop, function(status)
    {
        if(status !== false)
        {
            res.status(200).send();
        }
        else
        {
            res.status(500).send();
        }
    })
});



var returner  = function(res, returnString)
{
    console.log("her fra returner: " + returnString);
    res.writeHead(200, {'Content-Type': 'application/json','Content-Length':returnString.length+''});
    res.write(returnString);
    res.end();
}


//Should return an array of all the coffeeShopUsers, but dosen't work due to asych node shit, needs some callback magic in databaseFacade function: _coffeeShopUserGetAll!
router.get("/coffeshopuser/:coffeshopid", function(req, res, next)
{
    facade.coffeeShopUserGetAll(req.params.coffeshopid, function(data)
    {
        if(data !== false)
        {
            var returnString = "";
            for(var i = 0; i < data.length; i++)
            {
                // console.log("i loop ite number: " + i);
                returnString += JSON.stringify(data[i]) + ",";
            }
                // console.log("abekat!!!!!!!!!!!!!!!!!!!!!!!");
                console.log("final string: " + returnString);
                // res.writeHead(200, {'Content-Type': 'application/json','Content-Length':returnString.length+''});
                // res.write(returnString);
                res.end(JSON.stringify(data));
        }
        else
        {
            console.log("i else delen!")
            res.status(500).send();
        }
    });
});


//Steffen userLogin start

router.post("/user/login", function (req, res)
    {

        //her skal vi tjekke om der er en accessToken, eller en refreshToken og sammenligner den med vores secretKey.


        console.log("her er email " + req.body.email)
        facade.getUser(req.body.email, function (data)
        {

            if (data !== false)
            {
                console.log("req pass: " + req.body.password + "data pass: " + data.password);

                if(bcrypt.compareSync(req.body.password, data.password)){
                    console.log("vi er logget ind")
                    //steffen laver the shit
                    var refreshToken = null;
                    Token.createRefreshToken(data.id, function (newRefreshTokenCreated) {
                        console.log("vi kører refreshTOken")
                        refreshToken = newRefreshTokenCreated.refreshToken;

                    Token.getToken(data, function(accessToken)
                    {
                        console.log("vi kører accessToken")
                     console.log("Found accessToken - " + accessToken);
                        console.log("Found refreshToken - " + refreshToken);
                        var tokens = {"accessToken": accessToken, "refreshToken": refreshToken}
                        res.status(200).send(JSON.stringify(tokens));


                    });
                });
                } else {
                    console.log("vi bliver bare smidt herned")
                    res.status(747).send(); //747 returns that the username or password is incorrect.
                }



            }
            else
            {
                res.status(747).send(); //747 returns that the username or password is incorrect.
            }
        })


    }
);


router.post("/user/authentication", function(req, res) {
    var secretKey;

    // Her henter vi først secretKey
    var getSecret = Secret.getSecretKey(function (data) {
       secretKey = data;


    //Hvis vi finder secretKey går vi videre.
    if (getSecret !== null) {
        // check header  for Token
        console.log("checking if there is a accessToken.")
        var accessToken = req.body["accessToken"]; //det er navnet vi skal give accessToken i request fra client.

        // decode Token
        if (accessToken) {
            console.log("Verifying said accessToken.")
            // verifies Token
            jwt.verify(accessToken, secretKey, function (err, decoded) {
                if (err) {
                    console.log("accessToken blev ikke verified.")
                    var refreshToken = req.body["refreshToken"];
                    //hvis vi finder en refreshToken
                    if (refreshToken)
                    {
                        console.log("verifying refreshToken: " + refreshToken);

                        User.getUserByRefreshToken(refreshToken, function (data)
                        {

                            if (data === false){
                                console.log("kunne ikke verify refreshToken")
                                //det virkede ikke vi sender user til Login.
                                res.redirect(307, '/api/user/login');
                            } else {
                                console.log("refreshToken blev verified, laver ny accessToken");
                                //Hvis vi får lavet en ny accessToken sender vi user til home med en accessToken. Den skal client gemme i sharedPreferences og lave en ny cookie med den i.
                                //lav ny accessToken

                                Token.getToken(JSON.stringify(data), function (data) {
                                    console.log("Success vi har fået en ny accessToken")
                                    newAccessToken = data;
                                    res.redirect(307, '/home');
                                });

                            }
                        });
                    }
                    //her skal vi tjekke på refreshToken før vi går videre nedenunder.
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    console.log("here is token decoded: " + JSON.stringify(decoded));
                    res.redirect(200, "/home"); //redirect til appens "home" side
                }
            });

        } else {
            console.log("No Token found will start redirecting...")
            // if there is no Token
            //redirect user to login page.
            res.redirect(307, '/api/user/login');
        }
    }
    })
});


//Steffen userLogin slut





module.exports = router;
