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
router.delete("/user/:email", function (req, res)
{
    console.log("param: " + req.params.email)
    facade.deleteUser(req.params.email, function (status)
    {

        if (status !== false)
        {
            res.writeHead(200, {"accessToken": req.headers.accessToken});
            res.status(200).send();
        }
        else
        {
            res.status(500).send();
        }
    });
});



//New User  -- WORKS
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
                    res.writeHead(200, {"accessToken": req.headers.accessToken});
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
router.post("/card/new", function (req, res, next)

    {
        facade.createLoyaltyCard(req.body.brandID, req.body.userId, req.body.numberOfCoffeesBought, function (status)
            {

                if (status === true)
                {
                    res.writeHead(200, {"accessToken": req.headers.accessToken});
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
router.post("/role/new",  function (req, res, next)
    {

        facade.createRole(req.body.roleName, function (status)
            {

                if (status === true)
                {

                    res.writeHead(200, {"accessToken": req.headers.accessToken});
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
router.get("/user/:email", function (req, res, next)
    {

        facade.getUser(req.params.email, function (data)
        {

            if (data !== false)
            {
                res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});

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
router.get("/card/:LoyaltyCardId",  function (req, res)
    {
        facade.getLoyaltyCard(req.params.LoyaltyCardId, function (data)
        {

            if (data !== false)
            {
                res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});

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
                    res.writeHead(200, {"accessToken": req.headers.accessToken});
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
                    res.writeHead(200, {"accessToken": req.headers.accessToken});
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
                    res.writeHead(200, {"accessToken": req.headers.accessToken});
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


// var returner = function (res, returnString)
// {
//     console.log("her fra returner: " + returnString);
//     res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': returnString.length + ''});
//     res.write(returnString);
//     res.end();
// }

// get all roles WORKS
router.get("/allroles/",  function (req, res, next)
{

    facade.getAllRoles( function (status)
    {
        if (status !== false)
        {
            res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
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
            res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
            res.end(JSON.stringify(status));
        }
        else
        {
            res.status(500).send();
        }
    })
});

// WORKS
router.get("/allusers/",  function (req, res)
{

    facade.getAllUsers( function (status)
    {
        if (status !== false)
        {
            res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
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

// router.post("/user/login", function (req, res)
//     {
//
//         //her skal vi tjekke om der er en accessToken, eller en refreshToken og sammenligner den med vores secretKey.
//
//
//         console.log("her er email " + req.body.email)
//         facade.getUser(req.body.email, function (data)
//         {
//
//             if (data !== false)
//             {
//                 console.log("req pass: " + req.body.password + "data pass: " + data.password);
//
//                 if(bcrypt.compareSync(req.body.password, data.password)){
//                     console.log("vi er logget ind")
//                     //steffen laver the shit
//                     var refreshToken = null;
//                     Token.createRefreshToken(data.id, function (newRefreshTokenCreated) {
//                         console.log("vi kører refreshTOken")
//                         refreshToken = newRefreshTokenCreated.refreshToken;
//
//                     Token.getToken(data, function(accessToken)
//                     {
//                         console.log("vi kører accessToken")
//                      console.log("Found accessToken - " + accessToken);
//                         console.log("Found refreshToken - " + refreshToken);
//                         var tokens = {"accessToken": accessToken, "refreshToken": refreshToken}
//                         res.status(200).send(JSON.stringify(tokens));
//
//
//                     });
//                 });
//                 } else {
//                     console.log("vi bliver bare smidt herned")
//                     res.status(747).send(); //747 returns that the username or password is incorrect.
//                 }
//
//
//
//             }
//             else
//             {
//                 res.status(747).send(); //747 returns that the username or password is incorrect.
//             }
//         })
//
//
//     }
// );








router.post("/user/logout", function (req, res)
{
    console.log("kører api/logout")
        User.logoutUser(req.body.email, function (data)
        {
            if (data)
            {
                res.status(200).send("du er nu logget ud");
            } else {
                console.log("det gik galt")
            }
        })
});




//Steffen userLogin, userAuth og userLogout slut






module.exports = router;
