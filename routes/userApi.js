var express = require('express');
var router = express.Router();
var facade = require("../JS/DataBaseFacade.js");
var bcrypt = require('bcryptjs');



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
            "role": req.body.role,
            "birthday": new Date(req.body.birthday),
            "sex": req.body.sex,
            "password": pw
        }
        facade.newUser(userToSave, function (status)
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


//Should return an array of all the coffeeShopUsers, but dosen't work due to asych node shit, needs some callback magic in databaseFacade function: _coffeeShopUserGetAll!
router.get("/coffeshopuser/:coffeshopid", function(req, res, next)
{
    facade.coffeeShopUserGetAll(req.params.coffeshopid, function(data)
    {
        if(data !== false)
        {
            res.end(JSON.stringify(data));
        }
        else
        {
            res.status(500).send();
        }
    });
});



module.exports = router;
