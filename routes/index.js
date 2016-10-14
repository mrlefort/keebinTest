var express = require('express');
var router = express.Router();
var facade = require("../JS/DataBaseFacade.js");
var crypto = require('password-hash-and-salt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
 JEG HAR BRUG FOR AT FACADEN GIVER EN RETURN VALUE, SÅ JEG KAN SE OM JEG SKAL RETURNE HTTPKODE 200 ELLER ERROR!!!!!
 Also User tabel skal updates til at indeholde PassWord!!!! But this shit twerks, hvis bare tabellen var rigtig :)))
 */
router.post("/user/new", function(req, res, next)
{

  var pw;
  crypto('mysecret').hash(function(error, hash)
  {
    if(error)
      throw new Error('Something went wrong!');

    // Store hash (incl. algorithm, iterations, and salt)
    pw = hash;

    //   // Verifying a hash
    //   crypto('asdf').verifyAgainst(pw, function(error, verified)
    //   {
    //     if(error)
    //       throw new Error('Something went wrong!');
    //     if(!verified) {
    //       console.log("Don't try! We got you!");
    //     } else {
    //       console.log("The secret is...");
    //     }
    //   });
    console.log("her er pw: " +  pw);
    var userToSave =
    {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "email":req.body.email,
      "role" :req.body.role ,
      "birthday" : new Date(req.body.birthday),
      "sex": req.body.sex,
      "password" :pw
    }
    facade.newUser(userToSave);
    //Skal selvfølgelig ikke sende 200, hvis der er en fejl. Det kan jeg PGA facaden,
    // dog ikke detektere uden at lave en query efter useren i DB (endnu ikke implementeret, also fuckballs langsomt!)
    res.status(200).send();
  });


});

module.exports = router;