/**
 * Created by dino on 07-10-2016.
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
var CoffeeShopUsers = require('./CoffeeShopUser.js');



var sequelize = db.connect(); // Establishing connection to the MySQL database schema called keebin

sequelize.authenticate().then(function (err)
    {
        if (err)
        {
            console.log('There is connection in ERROR');
        } else
        {
            console.log('Connection has been established successfully');
        }
    }
); // Authenticating connection to the MySQL database connection above

function _createCoffeeBrand(CoffeeBrandName, NumbersOfCoffeesNeeded, callback) {

    CoffeeBrand.createCoffeeBrand(CoffeeBrandName, NumbersOfCoffeesNeeded, callback)

}

function _deleteCoffeeBrand(CoffeeBrandID, callback)
{

    CoffeeBrand.deleteCoffeeBrand(CoffeeBrandID, callback)

}



function _getCoffeeBrand(CoffeeBrandID, callback)
{

    CoffeeBrand.getCoffeeBrand(CoffeeBrandID, callback)

}


function _getAllCoffeeBrand(callback) {

    CoffeeBrand.getAllCoffeeBrands(callback)


};  // this one "gets" all CoffeeShops.


function _putCoffeeBrand(CoffeeBrandID, CoffeeBrandName, numberOfCoffeeNeeded, callback) {

    CoffeeBrand.putCoffeeBrand(CoffeeBrandID, CoffeeBrandName, numberOfCoffeeNeeded, callback)

}

function _deleteLoyaltyCard(ID, callback)
{

    LoyaltyCards.deleteLoyaltyCard(ID, callback)

}

function _createLoyaltyCard(brandName, userID, numberOfCoffeesBought, newLoyalcallback) {

    LoyaltyCards.createLoyaltyCard(brandName, userID, numberOfCoffeesBought, newLoyalcallback)

}


function _getLoyaltyCard(ID, callback)
{

LoyaltyCards.getLoyaltyCard(ID, callback)

}


function _getAllloyaltyCards(callback) {

    LoyaltyCards.getAllloyaltyCards(callback)

};  // this one "gets" all CoffeeShops.




function _putLoyaltyCard(LoyaltyCardID, brandName, userID, numberOfCoffeesBought, callback) {

    LoyaltyCards.putLoyaltyCard(LoyaltyCardID, brandName, userID, numberOfCoffeesBought, callback)

}

function _createRole(RoleN, callback) {

    Role.createRole(RoleN, callback)

};  //create role if roleN does not exist already.


function _deleteRole(RoleId, callback) {

    Role.deleteRole(RoleId, callback)

};  //create role if roleN does not exist already.

function _putRole(RoleId, NewRoleName, callback) {

    Role.putRole(RoleId, NewRoleName, callback)

};  //create role if roleN does not exist already.

function _getRole(RoleId, callback) {

    Role.getRole(RoleId, callback)

};  //create role if roleN does not exist already.

function _getAllRoles(callback) {

    Role.getAllRoles(callback)

};  //create role if roleN does not exist already.

function _createUser(FirstName, LastName, Email, Role, Birthday, Sex, password, callback) // this creates a user
{

User.createUser(FirstName, LastName, Email, Role, Birthday, Sex, password, callback)

}







function _putUser(userEmail, firstName, lastName, email, role, birthday, sex, password, callback) {

 User.putUser(userEmail, firstName, lastName, email, role, birthday, sex, password, callback);

}; // this edits user based on email.



function _deleteUser(userEmail, callback) {

  User.deleteUser(userEmail, callback)

}; //this one deletes user based on email.



function _getUser(userEmail, callback) {

User.getUser(userEmail, callback)

}; // this one "gets" a user based on email.


function _getAllUsers(callback) {

User.getAllUsers(callback)

};  // this one "gets" all CoffeeShops.

function _getUserById(userId, callback)
{

 User.getUserById(userId, callback)

}; //get one user from the DB by ID.

function _createCoffeeShop(email, brandName, address, phone, longitude, latitude, callback) // this creates a new CoffeeShop
{
    CoffeeShop.createCoffeeShop(email, brandName, address, phone, longitude, latitude, callback)
}

function _deleteCoffeeShop(coffeeShopEmail, callback) {

    CoffeeShop.deleteCoffeeShop(coffeeShopEmail, callback)

}; //this one deletes order based on id.


function _getCoffeeShop(coffeeShopEmail, callback) {

    CoffeeShop.getCoffeeShop(coffeeShopEmail, callback)

};  // this one "gets" a CoffeeSHop based on CoffeeShop Email.


function _getAllCoffeeShops(callback) {

    CoffeeShop.getAllCoffeeShops(callback)

};  // this one "gets" all CoffeeShops.

function _putCoffeeShop(coffeeShopEmail, email, brandName, address, phone, longitude, latitude, callback) {

    CoffeeShop.putCoffeeShop(coffeeShopEmail, email, brandName, address, phone, longitude, latitude, callback)

}; // this edits CoffeeShop based on email.






function _createOrder(currentUser, coffeeShopId, platform, callback) // This creates a new order - belonging to a user through the userId and a coffeeShop through CoffeeShopId
{

    Order.createOrder(currentUser, coffeeShopId, platform, callback)

}

function _deleteOrder(orderId, callback) {

    Order.deleteOrder(orderId, callback)

};  //this one deletes order based on id.

function _getOrder(orderId, callback) {

    Order.getOrder(orderId, callback)

}; // this one "gets" an order based on orderId.

function _getAllOrdersByUser(userEmail, callback) {

    Order.getAllOrdersByUser(userEmail, callback)


};  // this one "gets" all CoffeeShops.

function _createOrderItem(orderId, coffeeKindId, quantity, callback) // This creates a new order - belonging to a user through the userId and a coffeeShop through CoffeeShopId
{

    OrderItem.createOrderItem(orderId, coffeeKindId, quantity, callback)

}



//COFFEESHOPUSER STARTS HERE
function _createCoffeeShopUser(userEmail, coffeeShopEmail, callback)
{

    CoffeeShopUsers.createCoffeeShopUser(userEmail, coffeeShopEmail, callback)

};


function _getAllCoffeeShopUserByCoffeeShop(coffeeShopId, callback)
{

    CoffeeShopUsers.getAllCoffeeShopUserByCoffeeShop(coffeeShopId, callback)

};





//COFFEESHOPUSER ENDS HERE



module.exports = {createUser : _createUser, createRole : _createRole, putUser : _putUser,
    deleteUser : _deleteUser, getUser : _getUser, createCoffeeShop: _createCoffeeShop,
deleteCoffeeShop : _deleteCoffeeShop, createOrder : _createOrder, createOrderItem : _createOrderItem,
    deleteOrder : _deleteOrder, getOrder: _getOrder,
getCoffeeShop : _getCoffeeShop, putCoffeeShop : _putCoffeeShop, getAllCoffeeShops : _getAllCoffeeShops,
    getAllOrdersByUser : _getAllOrdersByUser,
getAllUsers : _getAllUsers, createCoffeeShopUser: _createCoffeeShopUser,
    getAllcoffeeShopUser: _getAllCoffeeShopUserByCoffeeShop, getUserById : _getUserById
, deleteLoyaltyCard : _deleteLoyaltyCard, createLoyaltyCard : _createLoyaltyCard, getLoyaltyCard : _getLoyaltyCard,
    getAllloyaltyCards : _getAllloyaltyCards, putLoyaltyCard : _putLoyaltyCard,
    createCoffeeBrand : _createCoffeeBrand, putCoffeeBrand : _putCoffeeBrand, getAllCoffeeBrand : _getAllCoffeeBrand,
    getCoffeeBrand : _getCoffeeBrand, deleteCoffeeBrand : _deleteCoffeeBrand, deleteRole : _deleteRole, putRole : _putRole, getRole : _getRole, getAllRoles :  _getAllRoles}; // Export Module



