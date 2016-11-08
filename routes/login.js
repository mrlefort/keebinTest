/**
 * Created by mrlef on 11/8/2016.
 */
var express = require('express');
var router = express.Router();
var facade = require('../JS/DataBaseFacade.js');
var bcrypt = require('bcryptjs');
var Token = require('../JS/Token.js');



router.post("/", function (req, res)
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


module.exports = router;