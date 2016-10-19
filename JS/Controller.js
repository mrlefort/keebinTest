/**
 * Created by dino on 29-09-2016.
 */


var userClass = require('./User.js');
var db = require('./DataBaseFacade.js');
var lc = require('./LoyaltyCard.js');
var Role = require('./Role.js');
var CB = require('./CoffeeBrand.js');
// the functions under this needs to be moved to db so calling db.new db.newLoyaltyCard('1', '3', '3') will result the same.
// lc.newLoyaltyCard('1', '3', '3', function(models) {
//     if(models == false)
//     {
//         console.log("if false.... ! " + models);
//     }
//     else {
//         console.log("if true...  - " + models);
//     }
// });
//
//
// lc.findLoyaltyCard('8', function(models) {
//     if(!models)
//     {
//         console.log("User has not been found");
//     }
//     else {
//         console.log("User has bought - " + models.numberOfCoffeesBought + " coffees with loyal card id - " + models.id);
//     }
// });
//
// lc.deleteLoyaltyCard('7', function(models) {
//
//     console.log("User has been deleted = " + models);
//
// });
//
// lc.editLoyaltyCard(8, 1, 3, 7, function(models) {
//
//
//     console.log("User has been updated = " + models);
//
// });

// CB.newCoffeeBrand("Hulla!", 7, function(models) {
//
//
//     console.log("CoffeBrand has been created = " + models);
//
// });

// var test = new userClass.newUser("test", "testEfternavn", "john@gmaile.com", 1, "09/09/2010", "male", 12345);
// var test2 = new userClass.newUser("test2", "testEfternavn2", "johna@gmailr.com", 2, "09/01/2010", "female", 2341);


// db.newRole("Admin");
// db.newRole("user");

// db.newUser(test);
// db.newUser(test2);




