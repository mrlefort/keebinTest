/**
 * Created by Dino on 10/27/2016.
 */
var express = require('express');
var router = express.Router();
var facade = require("../JS/DataBaseFacade.js");
var bcrypt = require('bcryptjs');


//Deletes a CoffeeBrand by ID
router.delete("/brand/:CoffeeBrandID", function (req, res)
{
    console.log("param: " + req.params.CoffeeBrandID)
    facade.deleteCoffeeBrand(req.params.CoffeeBrandID, function (status)
    {
        if (status !== false)
        {
            res.status(200).send();
        }
        else
        {
            res.status(500).send();
        }
    });
});

// delete a coffe shop on the email
router.delete("/shop/:CoffeeShopEmail", function (req, res)
{
    console.log("param: " + req.params.CoffeeShopEmail)
    facade.deleteCoffeeShop(req.params.CoffeeShopEmail, function (status)
    {
        if (status !== false)
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
router.post("/brand/new", function (req, res, next)
    {

        facade.createCoffeeBrand(req.body.brandName, req.body.numberOfCoffeeNeeded, function (status)
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

router.post("/shop/new", function (req, res, next)
    {
     var brandID = req.body.brandName;
        facade.createCoffeeShop(req.body.email, brandID, req.body.address, req.body.phone, function (status)
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


router.post("/shopuser/new", function (req, res, next)
    {

        facade.createCoffeeShopUser(req.body.userEmail, req.body.coffeeShopEmail, function (status)
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


//Get brand by brandID
router.get("/brand/:brandID", function (req, res, next)
    {
        facade.getCoffeeBrand(req.params.brandID, function (data)
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
        });
    }
);

// get a coffeshop by email
router.get("/shop/:email", function (req, res, next)
    {
        facade.getCoffeeShop(req.params.email, function (data)
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
        });
    }
);

router.get("/allshops/all", function (req, res, next)
{

    facade.getAllCoffeeShops( function (status)
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

router.get("/allbrands/all", function (req, res, next)
{

    facade.getAllCoffeeBrand( function (status)
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

router.get("/allshopusers/:shopID", function (req, res, next)
{
   console.log(req.params.shopID);
    facade.getAllcoffeeShopUser(req.params.shopID, function (status)
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

//Edit a brand expects the full input
router.put("/brand/:brandID", function (req, res, next)
    {

   var brandID = req.body.brandName;
        facade.putCoffeeBrand(req.params.brandID, brandID, req.body, req.body.numberOfCoffeeNeeded, function (status)
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

router.put("/shop/:shopID", function (req, res, next)
    {

        facade.putCoffeeShop(req.body.coffeeShopEmail, req.body.email, req.body.brandName, req.body.address, req.body.phone, function (status)
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
            })


    });


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





module.exports = router;
