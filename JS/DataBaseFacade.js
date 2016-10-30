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
); // Authenticating connection to the MySQL database connection above




function _createCoffeeBrand(CoffeeBrandName, NumbersOfCoffeesNeeded, callback) {
    if (validate.valBrand(CoffeeBrandName, NumbersOfCoffeesNeeded)) {
        CoffeeBrand.createCoffeeBrand(CoffeeBrandName, NumbersOfCoffeesNeeded, callback)
    } else return false
}

function _deleteCoffeeBrand(CoffeeBrandID, callback) {
    if (validate.valID(CoffeeBrandID)) {
        CoffeeBrand.deleteCoffeeBrand(CoffeeBrandID, callback)
    } else return false

}


function _getCoffeeBrand(CoffeeBrandID, callback) {
    if (validate.valID(CoffeeBrandID)) {
        CoffeeBrand.getCoffeeBrand(CoffeeBrandID, callback)
    } else return false
}


function _getAllCoffeeBrand(callback) {

    CoffeeBrand.getAllCoffeeBrands(callback)


};  // this one "gets" all CoffeeShops.

function _putCoffeeBrand(CoffeeBrandID, CoffeeBrandName, numberOfCoffeeNeeded, callback) {
    if (validate.valID(CoffeeBrandID) && validate.valBrand(CoffeeBrandName, CoffeeBrandName)) {
        CoffeeBrand.putCoffeeBrand(CoffeeBrandID, CoffeeBrandName, numberOfCoffeeNeeded, callback)
    } else return false
}

function _deleteLoyaltyCard(ID, callback) {
    if (validate.valID(ID)) {
        LoyaltyCards.deleteLoyaltyCard(ID, callback)
    } else return false
}

function _createLoyaltyCard(brandName, userID, numberOfCoffeesBought, newLoyalcallback) {
    if (validate.valID(userID) && validate.valBrand(brandName, numberOfCoffeesBought)) {
        LoyaltyCards.createLoyaltyCard(brandName, userID, numberOfCoffeesBought, newLoyalcallback)
    } else return false
}


function _getLoyaltyCard(ID, callback) {
    if (validate.valID(ID)) {
        LoyaltyCards.getLoyaltyCard(ID, callback)
    } else return false
}


function _getAllloyaltyCards(callback) {

    LoyaltyCards.getAllloyaltyCards(callback)

};  // this one "gets" all CoffeeShops.


function _putLoyaltyCard(LoyaltyCardID, brandName, userID, numberOfCoffeesBought, callback) {
    if (validate.valID(LoyaltyCardID) && validate.valID(userID)) {
        if (validate.valBrand(brandName, numberOfCoffeesBought)) {
            LoyaltyCards.putLoyaltyCard(LoyaltyCardID, brandName, userID, numberOfCoffeesBought, callback)
        } else return false
    } else return false

}

function _createRole(RoleN, callback) {
    if (validate.valRole(RoleN)) {
        Role.createRole(RoleN, callback)
    } else return false
};  //create role if roleN does not exist already.


function _deleteRole(RoleId, callback) {
    if (validate.valID(RoleId)) {
        Role.deleteRole(RoleId, callback)
    }else return false
};  //create role if roleN does not exist already.

function _putRole(RoleId, NewRoleName, callback) {
    if(validate.valID(RoleId)&& validate.valRole(NewRoleName)) {
        Role.putRole(RoleId, NewRoleName, callback)
    } else return false
};  //create role if roleN does not exist already.

function _getRole(RoleId, callback) {
    if(validate.valID(RoleId)) {
        Role.getRole(RoleId, callback)
    }
};  //create role if roleN does not exist already.

function _getAllRoles(callback) {

    Role.getAllRoles(callback)

};  //create role if roleN does not exist already.

function _createUser(FirstName, LastName, Email, Role, Birthday, Sex, password, callback) // this creates a user
{
    // if(validate.valUser(user)) {
        User.createUser(FirstName, LastName, Email, Role, Birthday, Sex, password, callback)
    // }else return false
}


function _putUser(userEmail, firstName, lastName, email, role, birthday, sex, password, callback) {
// if(validate.valUser(user)) {
    User.putUser(userEmail, firstName, lastName, email, role, birthday, sex, password, callback);
    // }else return false

}; // this edits user based on email.


function _deleteUser(userEmail, callback) {
    if(validate.valEmail(userEmail)) {
        User.deleteUser(userEmail, callback)
    }else return false
}; //this one deletes user based on email.


function _getUser(userEmail, callback) {
    if(validate.valEmail(userEmail)) {
        User.getUser(userEmail, callback)
    }else return false
}; // this one "gets" a user based on email.


function _getAllUsers(callback) {

    User.getAllUsers(callback)

};  // this one "gets" all CoffeeShops.

function _getUserById(userId, callback) {
    if(validate.valID(userId)) {
        User.getUserById(userId, callback)
    }else return false
}; //get one user from the DB by ID.

function _createCoffeeShop(email, brandName, address, phone, callback) // this creates a new CoffeeShop
{
    if(validate.valCoffeeshop()) {
        CoffeeShop.createCoffeeShop(email, brandName, address, phone, callback)
    }else return false
}

function _deleteCoffeeShop(coffeeShopEmail, callback) {
    if(validate.valEmail(coffeeShopEmail)) {
        CoffeeShop.deleteCoffeeShop(coffeeShopEmail, callback)
    }else return false
}; //this one deletes order based on id.


function _getCoffeeShop(coffeeShopEmail, callback) {
    if(validate.valEmail(coffeeShopEmail)) {
    CoffeeShop.getCoffeeShop(coffeeShopEmail, callback)
    }else return false
};  // this one "gets" a CoffeeSHop based on CoffeeShop Email.


function _getAllCoffeeShops(callback) {

    CoffeeShop.getAllCoffeeShops(callback)

};  // this one "gets" all CoffeeShops.

function _putCoffeeShop(coffeeShopEmail, email, brandName, address, phone, callback) {
// if(validate.valCoffeeshop(coffeeShop)) {
    CoffeeShop.putCoffeeShop(coffeeShopEmail, email, brandName, address, phone, callback)
// } else return false
}; // this edits CoffeeShop based on email.


function _createOrder(currentUser, coffeeShopId, platform, callback) // This creates a new order - belonging to a user through the userId and a coffeeShop through CoffeeShopId
{
if(validate.valOrder(order)) {
    Order.createOrder(currentUser, coffeeShopId, platform, callback)
}else return false
}

function _deleteOrder(orderId, callback) {
if(validate.valID(orderId)) {
    Order.deleteOrder(orderId, callback)
}else return false
};  //this one deletes order based on id.

function _getOrder(orderId, callback) {
    if(validate.valID(orderId)) {
        Order.getOrder(orderId, callback)
    }
}; // this one "gets" an order based on orderId.

function _getAllOrdersByUser(userEmail, callback) {

    Order.getAllOrdersByUser(userEmail, callback)


};  // this one "gets" all CoffeeShops.

function _createOrderItem(orderId, coffeeKindId, quantity, callback) // This creates a new order - belonging to a user through the userId and a coffeeShop through CoffeeShopId
{
    if(validate.valOrderItem(orderItem)){
    OrderItem.createOrderItem(orderId, coffeeKindId, quantity, callback)
    }else return false
}


//COFFEESHOPUSER STARTS HERE
function _createCoffeeShopUser(userEmail, coffeeShopEmail, callback) {
    if(validate.valEmail(userEmail) && validate.valEmail(coffeeShopEmail)){
    CoffeeShopUsers.createCoffeeShopUser(userEmail, coffeeShopEmail, callback)
    }else return false
};


function _getAllCoffeeShopUserByCoffeeShop(coffeeShopId, callback) {

    CoffeeShopUsers.getAllCoffeeShopUserByCoffeeShop(coffeeShopId, callback)

};


//COFFEESHOPUSER ENDS HERE


module.exports = {
    createUser: _createUser,
    createRole: _createRole,
    putUser: _putUser,
    deleteUser: _deleteUser,
    getUser: _getUser,
    createCoffeeShop: _createCoffeeShop,
    deleteCoffeeShop: _deleteCoffeeShop,
    createOrder: _createOrder,
    createOrderItem: _createOrderItem,
    deleteOrder: _deleteOrder,
    getOrder: _getOrder,
    getCoffeeShop: _getCoffeeShop,
    putCoffeeShop: _putCoffeeShop,
    getAllCoffeeShops: _getAllCoffeeShops,
    getAllOrdersByUser: _getAllOrdersByUser,
    getAllUsers: _getAllUsers,
    createCoffeeShopUser: _createCoffeeShopUser,
    getAllcoffeeShopUser: _getAllCoffeeShopUserByCoffeeShop,
    getUserById: _getUserById,
    deleteLoyaltyCard: _deleteLoyaltyCard,
    createLoyaltyCard: _createLoyaltyCard,
    getLoyaltyCard: _getLoyaltyCard,
    getAllloyaltyCards: _getAllloyaltyCards,
    putLoyaltyCard: _putLoyaltyCard,
    createCoffeeBrand: _createCoffeeBrand,
    putCoffeeBrand: _putCoffeeBrand,
    getAllCoffeeBrand: _getAllCoffeeBrand,
    getCoffeeBrand: _getCoffeeBrand,
    deleteCoffeeBrand: _deleteCoffeeBrand,
    deleteRole: _deleteRole,
    putRole: _putRole,
    getRole: _getRole,
    getAllRoles: _getAllRoles
}; // Export Module



