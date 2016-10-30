/**
 * Created by noncowi on 30-10-2016.
 */
var db = require('./DataBaseCreation.js');
var Sequelize = require('sequelize'); // Requires
var Role = require('./Role.js'); // Requires
var User = require('./User.js'); // Requires
var OrderItem = require('./OrderItem.js'); // Requires
var LoyaltyCards = require('./LoyaltyCard.js'); // Requires
var CoffeeBrand = require('./CoffeeBrand.js'); // Requires
var Order = require('./Order.js'); // Requires
var CoffeeShop = require('./CoffeeShop.js'); // Requires
var CoffeeShopUsers = require('./CoffeeShopUser.js'); // Requires
var validate = require('./Validator');


var sequelize = db.connect(); // Establishing connection to the MySQL database schema called keebin

sequelize.authenticate().then(function (err) {
        if (err) {
            console.log('There is connection in ERROR');
        } else {
            console.log('Connection has been established successfully');
        }
    }
); // Authenticating connection to the MySQL database connection


// i teorien brude vi ikke behøve mere end coffeeCode, numbersOfCoffeeBought og userID til at lave functionen.
function _coffeeBought(userID, coffeeCode, numbersOfCoffeeBought, callback) {
    //Springer steppet med CoffeeCode over. den skal finde Brandname for mig.
    if (validate.valID(userID) && validate.valNumber(numbersOfCoffeeBought)) {
        LoyaltyCards.getLoyaltyCardByUserAndBrand(userID, brandName, function (data) {
            if (data == false) {
                LoyaltyCards.createLoyaltyCard(brandName, userID, numbersOfCoffeeBought, function (createData) {
                    return callback(createData);
                })
            } else {
                LoyaltyCards.addToNumberOfCoffeesBought(data.id, numbersOfCoffeeBought, function (addData) {
                    return callback(addData);
                })
            }
        })
    }
}