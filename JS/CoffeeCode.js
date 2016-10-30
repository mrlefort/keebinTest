/**
 * Created by noncowi on 30-10-2016.
 */

var db = require('./DataBaseCreation.js');
var sequelize = db.connect();
var CoffeeCode = db.CoffeeCode();

// function _getCoffeeBrandByCoffeeCode(coffeeCode, callback) {
//     var coffeeBrandFound = false;
//
//     console.log("_getCoffeeShop is running. Finding coffeeShop with email: " + coffeeShopEmail);
//     CoffeeShop.find({where: {code: coffeeShopEmail}}).then(function (data, err) {
//         if (data !== null) {
//             console.log("CoffeeShop with email: " + data.email + " found.");
//             callback(data);
//
//         } else {
//             console.log(err);
//             console.log("could not find: " + coffeeShopEmail);
//             callback(coffeeShopFound);
//
//         }
//
//
//     })
//
//
// };
function _createCoffeeCode(coffeeCode,brandName, callback) // this creates a user
{
    var coffeeCodeCreated = false;

    console.log("createCoffeeCode is running. ")
    CoffeeCode.find({where: {coffeeCode: coffeeCode}}).then(function (data) { // we have run the callback inside the .then
        if (data !== null) {
            console.log("coffeeCode found - coffeeCode exists already - " + data.coffeeCode)
            callback(coffeeCodeCreated);
        } else {
            return sequelize.transaction(function (t) {

                // chain all your queries here. make sure you return them.
                return CoffeeCode.create({
                    coffeeCode: coffeeCode,
                    brandName: brandName

                }, {transaction: t})

            }).then(function (result) {
                console.log("Transaction has been committed - coffeeCode has been saved to the DB");
                coffeeCodeCreated = true;
                callback(userCreated);

                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                callback(coffeeCodeCreated);
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            })
        }
    })
}
function _deleteCoffeeCode(coffeeCode, callback){
    CoffeeCode.find({where: {coffeeCode: coffeeCode}}).then(function(result) {
        if(result !== null) {
            result.destroy().then(function (data) {

                if (data !== null) {
                    console.log("Successfully deleted coffeeCode with ID - " + ID)
                    callback(true);
                    // successfully deleted the project
                }
                else {
                    console.log("Failed to delete coffeeCode with ID - " + ID)
                    callback(false);
                }
            })
        }
        else
        {
            console.log("No coffeeCode exists with the coffeeCode - " + coffeeCode)
            callback(false);
        }
    })
}