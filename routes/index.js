var express = require('express');
var router = express.Router();
var facade = require("../JS/DataBaseFacade.js");
var bcrypt = require('bcryptjs');


//New User
router.post("/user/new", function (req, res, next)
    {
        var salt = bcrypt.genSaltSync(15);
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

//Get user by ID
router.get("/user/:id", function (req, res, next)
    {
        facade.getUser(req.params.id, function (data)
            {
                if (data != false)
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

//Edit a user expect the full input minus PW!
router.put("/user/:id", function (req, res, next)
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

module.exports = router;
