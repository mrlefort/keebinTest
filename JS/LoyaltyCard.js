


var db = require('./DataBaseCreation.js');
var conn = db.connect();

var numberOfCoffeesBought;
var brand = "";
var userID = "";
var coffeesNeededForThisBrand;

var readyForFreeCoffee;
var loyaltyCards = db.LoyaltyCards();


// _newLoyaltyCard(1, 3, 3);
// _deleteLoyaltyCard(4);
// _EditLoyaltyCard(5, 1, 3, 5)



function _deleteLoyaltyCard(ID, callback)
{
    var returnstatement = false;
    loyaltyCards.find({where: {Id: ID}}).then(function(loyaltyCard) {
        if(loyaltyCard !== null) {
            loyaltyCard.destroy().then(function (data) {

                if (data !== null) {
                    console.log("Successfully deleted LoyaltyCard with ID - " + ID)
                    callback(true);
                    // successfully deleted the project
                }
                else {
                    console.log("Failed to delete LoyaltyCard with ID - " + ID)
                    callback(false);
                }
            })
        }
        else
        {
            console.log("No LoyaltyCard exists with the ID - " + ID)
            callback(false);
        }
    })

}

function _newLoyaltyCard(brandName, userID, numberOfCoffeesBought, newLoyalcallback) {
    this.brandName = brandName;
    this.numberOfCoffeesBought = numberOfCoffeesBought; //loyaltyCards bliver lavet når man første gang trykker "tilføj kop" til en branch.
    this.userID = userID;
    this.readyForFreeCoffee = false;

    var returnstatement;

    var runIfUserAndCardFoundFalse = function (duplicatecheck, callback) {
        // runIfRoleFoundFalse is the second function (the callback) - we feed RoleFound as a parameter and name is doesRoleExist
        if (duplicatecheck == false) {
            return conn.transaction(function (t) {

                // chain all your queries here. make sure you return them.
                return loyaltyCards.create({
                    numberOfCoffeesBought: numberOfCoffeesBought,
                    userId: userID, brandName: brandName


                }, {transaction: t}) // kom her til

            }).then(function (result) {
                console.log("Transaction has been committed - Role has been saved to the DB.");
                returnstatement = true;
                newLoyalcallback(returnstatement);
                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                returnstatement = false;
                newLoyalcallback(returnstatement);
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            });
        } else {
            console.log("couldn't create new Loyalty Card ");
            returnstatement = false;
            newLoyalcallback(returnstatement);

        }
        ;
    }


    var checkforduplicates = function (callback) {
        //setROleFound is the first function to run.


        console.log("setRoleFound is running. ")
        loyaltyCards.find({where: {brandName: brandName, userId: userID}}).then(function (data) { // we have run the callback inside the .then
            var Found;
            if (data !== null) {
                console.log("User found -  " + data.userId)
                Found = true;
            } else {
                Found = false;
            }
            //we give RoleFound to callback
            callback(Found);

        })

    }
   checkforduplicates(runIfUserAndCardFoundFalse);
}

function _findLoyaltyCard(ID, callback)
{
    loyaltyCards.find({where: {Id: ID}}).then(function (data) { // we have run the callback inside the .then
        console.log("running loyaltycards");
        if (data !== null) {
            console.log("User found -  " + data.userId)
            callback(data);

        } else {
            console.log("Fail");
            callback(false);
        }


})

}



function steffen(data) {
    console.log("vi er nu i steffen")
    console.log(data.userId);
    return data;
}







function _EditLoyaltyCard(LoyaltyCardID, brandName, userID, numberOfCoffeesBought, callback) {
    loyaltyCards.find({where:{Id:LoyaltyCardID}}).then(function (data, err) {
        if(err){

            console.log("something went wrong!");
            callback(false);

        }
        if(data){
            console.log("Trying to update...")
            // data.updateatt = update given attributes in the object
            // attribute : attributevalue to edit to.
            data.updateAttributes({
                numberOfCoffeesBought: numberOfCoffeesBought,
                userId: userID, brandName: brandName
            }).then(function (data1) {
                console.log("Something went right!");
                callback(true);
            })
        }
    });
}

/*
function _a (ID, callback) {
    loyaltyCards.find({where: {Id: ID}}).then(function (data, err) { // we have run the callback inside the .then
        if (err) throw new Error(err);
        callback(data);
    });
}; */


// Export Functions

module.exports = {newLoyaltyCard : _newLoyaltyCard, deleteLoyaltyCard : _deleteLoyaltyCard, findLoyaltyCard : _findLoyaltyCard, editLoyaltyCard : _EditLoyaltyCard}; // Export Module/**


// below is a useage of loyality cards in etc Controller.
/*

 lc.newLoyaltyCard('1', '3', '3', function(models) {
 if(models == false)
 {
 console.log("if false.... ! " + models);
 }
 else {
 console.log("if true...  - " + models);
 }
 });


lc.findLoyaltyCard('8', function(models) {
    if(!models)
    {
        console.log("User has not been found");
    }
    else {
        console.log("User has bought - " + models.numberOfCoffeesBought + " coffees with loyal card id - " + models.id);
    }
});

lc.deleteLoyaltyCard('7', function(models) {

    console.log("User has been deleted = " + models);

});

lc.editLoyaltyCard(8, 1, 3, 7, function(models) {


    console.log("User has been updated = " + models);

});

*/


