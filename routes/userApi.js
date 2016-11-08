var express = require('express');
var router = express.Router();
var facade = require('../JS/DataBaseFacade.js');
var bcrypt = require('bcryptjs');
var Token = require('../JS/Token.js');
var jwt = require('jsonwebtoken');
var Secret = require('../JS/Secret.js');
var User = require('../JS/User.js');
var cookie = require('cookie');
var passport = require('passport');






//Deletes a user by email -- WORKS
router.delete("/user/:email", isAuthenticated, function (req, res)
{
    console.log("param: " + req.params.email)
    facade.deleteUser(req.params.email, function (status)
    {

        if (status !== false)
        {
            res.writeHead(200, {"accessToken": req.accessToken});
            res.status(200).send();
        }
        else
        {
            res.status(500).send();
        }
    });
});



//New User  -- WORKS
router.post("/user/new", isAuthenticated, function (req, res, next)
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
                    res.writeHead(200, {"accessToken": req.accessToken});
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


// WORKS
router.post("/card/new", isAuthenticated,  function (req, res, next)

    {
        facade.createLoyaltyCard(req.body.brandID, req.body.userId, req.body.numberOfCoffeesBought, function (status)
            {

                if (status === true)
                {
                    res.writeHead(200, {"accessToken":req.accessToken});
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


//New Role -- WORKS
router.post("/role/new", isAuthenticated,  function (req, res, next)
    {

        facade.createRole(req.body.roleName, function (status)
            {
                res.writeHead(200, {"accessToken": req.accessToken});
                if (status === true)
                {

                    // res.writeHead(200, {"accessToken": req.accessToken});
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

//Get user by email -- WORKS
router.get("/user/:email", isAuthenticated,  function (req, res, next)
    {

        facade.getUser(req.params.email, function (data)
        {

            if (data !== false)
            {
                res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.accessToken});

                res.end(JSON.stringify(data));
            }
            else
            {
                res.status(500).send();
            }
        });
    }
);

// WORKS
router.get("/card/:LoyaltyCardId", isAuthenticated, function (req, res)
    {
        facade.getLoyaltyCard(req.params.LoyaltyCardId, function (data)
        {
            res.writeHead(200, {"accessToken":req.accessToken});
            if (data !== false)
            {
                res.writeHead(200, {"Content-Type": "application/json"});

                res.end(JSON.stringify(data));
            }
            else
            {
                res.status(500).send();
            }
        });
    }
);

//Edit a user expects the full input -- WORKS (Returns the edited user)
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
            "password": pw
        }


        console.log(userToSave.role);

        facade.putUser(userToSave.email, userToSave.firstName, userToSave.lastName, userToSave.email, userToSave.role, userToSave.birthday, userToSave.sex, userToSave.password, function (status)
            {
                console.log("her er status: " + status)
                if (status !== false)
                {
                    delete userToSave.password;
                    res.write(JSON.stringify(userToSave));
                    res.status(200).send();
                }
                if (status === false)
                {
                    res.status(500).send();
                }
            }
        );

    }
);

// WORKS
router.put("/role/:roleId", function (req, res, next)
    {
        facade.putRole(req.params.roleId, req.body.roleName, function (status)
            {
                if (status !== false)
                {
                    res.write(JSON.stringify(status));
                    res.status(200).send();
                }
                if (status === false)
                {
                    res.status(500).send();
                }
            }
        );

    }
);

// WORKS
router.put("/card/:LoyaltyCard", function (req, res, next)
    {
        var LoyaltyCardID = req.params.LoyaltyCard;
        facade.putLoyaltyCard(LoyaltyCardID, req.body.brandName, req.body.userId, req.body.numberOfCoffeesBought, function (status)
            {
                if (status !== false)
                {
                    res.write(JSON.stringify(status));
                    res.status(200).send();
                }
                if (status === false)
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


var returner = function (res, returnString)
{
    console.log("her fra returner: " + returnString);
    res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': returnString.length + ''});
    res.write(returnString);
    res.end();
}

// get all roles WORKS
router.get("/allroles/", function (req, res, next)
{

    facade.getAllRoles( function (status)
    {
        if (status !== false)
        {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(status));
        }
        else
        {
            res.status(500).send();
        }
    })
});


// WORKS
router.get("/allcards/", function (req, res)
{

    facade.getAllloyaltyCards( function (status)
    {
        if (status !== false)
        {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(status));
        }
        else
        {
            res.status(500).send();
        }
    })
});

// WORKS
router.get("/allusers/", function (req, res)
{

    facade.getAllUsers( function (status)
    {
        if (status !== false)
        {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(status));
        }
        else
        {
            res.status(500).send();
        }
    })
});



//Should return an array of all the coffeeShopUsers, but dosen't work due to asych node shit, needs some callback magic in databaseFacade function: _coffeeShopUserGetAll!

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


function isAuthenticated(req, res, next) {
    var secretKey;

    // Her henter vi først secretKey
    var getSecret = Secret.getSecretKey(function (data) {
       secretKey = data;


    //Hvis vi finder secretKey går vi videre.
    if (getSecret !== null) {
        // check header  for Token
        console.log("her er req: " + req)
        console.log("checking if there is a accessToken.")
        var accessToken = req.get('accessToken'); //det er navnet vi skal give accessToken i request fra client.
        console.log("her er accessToken: " + accessToken)
        // decode Token
        if (accessToken !== null) {
            console.log("Verifying said accessToken.")
            // verifies Token
            jwt.verify(accessToken, secretKey, function (err, decoded) {
                if (err) {
                    console.log("accessToken blev ikke verified.")
                    var refreshToken = req.get('refreshToken');

                    //hvis vi finder en refreshToken
                    if (refreshToken !== null)
                    {
                        console.log("verifying refreshToken: " + refreshToken);

                        User.getUserByRefreshToken(refreshToken, function (user)
                        {
                            //her skal vi tjekke på refreshToken før vi går videre nedenunder.
                            if (user === false){
                                console.log("kunne ikke verify refreshToken")
                                //det virkede ikke vi sender user til Login.
                                res.redirect('/api/user/login');
                            } else {

                                console.log("refreshToken blev verified, laver ny accessToken");
                                //Hvis vi får lavet en ny accessToken sender vi user til home med en accessToken. Den skal client gemme i sharedPreferences og lave en ny cookie med den i.
                                //lav ny accessToken
                                Token.getToken(user, function (data) {
                                    console.log("hvad er user? " + user)
                                    console.log("Success vi har fået en ny accessToken")
                                    newAccessToken = data;
                                    req.headers.accessToken = newAccessToken;
                                    jwt.verify(newAccessToken, secretKey, function (err, decoded) {
                                        req.decoded = decoded;

                                        next();
                                    })
                                });

                            }


                        });
                    }

                } else {
                    // if everything is good, save to request for use in other routes
                    req.accessToken = accessToken;
                    req.decoded = decoded;
                    console.log("accessToken blev verified")
                    next();
                    // res.redirect(307, "/home"); //redirect til appens "home" side - Kan ikke finde ud af hvordan jeg sender decoded med. Skal jeg lave en cookie?
                }
            });

        } else {
            console.log("No Token found will start redirecting...")
            // if there is no Token
            //redirect user to login page.
            res.redirect('/api/users/user/login');
        }
    }
    })
};






router.post("/user/logout", function (req, res)
{
    console.log("kører api/logout")
        User.logoutUser(req.body.email, function (data)
        {
            if (data)
            {
                res.redirect(200, "/api/user/login");
            } else {
                console.log("det gik galt")
            }
        })
});




//Steffen userLogin, userAuth og userLogout slut






module.exports = router;
