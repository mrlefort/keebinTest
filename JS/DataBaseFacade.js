/**
 * Created by dino on 07-10-2016.
 */


var userClass = require('./User.js');
var db = require('./DataBaseCreation.js');
var Sequelize = require('sequelize'); // Requires
var Role = db.Role();
var User = db.User();
var CoffeeBrand = db.CoffeeBrand();
var LoyaltyCards = db.LoyaltyCards();
var CoffeeKind = db.CoffeeKind();
var Order = db.Order();
var CoffeeShop = db.CoffeeShop();
var CoffeeShopUsers = db.CoffeeShopUsers();
var OrderItem = db.OrderItem(); //Setting up the requires



 var sequelize = db.connect(); // Establishing connection to the MySQL database schema called keebin

sequelize.authenticate().then(function (err) {
    if (err) {
        console.log('There is connection in ERROR');
    } else {
        console.log('Connection has been established successfully');
    }
}); // Authenticating connection to the MySQL database connection above

function _newRole(RoleN, callback) {

    console.log("setRoleFound is running. ")
    Role.find({where: {RoleName: RoleN}}).then(function (data) { // we have run the callback inside the .then
        var roleCreated = true;
        if (data !== null){
            console.log("role found " + data.roleName)
            roleCreated = false;
            callback(roleCreated);

        } else {
            return sequelize.transaction(function (t) {


                // chain all your queries here. make sure you return them.
                return Role.create({
                    roleName: RoleN


                }, {transaction: t}) // kom her til

            }).then(function (result) {
                roleCreated = true;
                console.log("Transaction has been committed - Role has been saved to the DB.");
                callback(roleCreated);

                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                callback(roleCreated);
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            });
        }



    })
};  //create role if roleN does not exist already.



function _newUser(newUser, callback) // this creates a user
{
    var userCreated = false;

    console.log("newUser is running. ")
    User.find({where: {Email: newUser.email}}).then(function (data) { // we have run the callback inside the .then
        if (data !== null){
            console.log("user found - email exists already - " + data.email)
            callback(userCreated);
        } else {
            return sequelize.transaction(function (t) {

                // chain all your queries here. make sure you return them.
                return User.create({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    roleId: newUser.role,
                    birthday: newUser.birthday,
                    sex: newUser.sex,
                    password: newUser.password

                }, {transaction: t})

            }).then(function (result) {
                console.log("Transaction has been committed - user has been saved to the DB");
                userCreated = true;
                callback(userCreated);

                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                callback(userCreated);
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            })
        }
        })







}


function _userPut(userEmail, editUser, callback) {
    var userUpdated = false;

        console.log("userPutFind is running. Finding: " + userEmail);
        User.find({where: {Email: userEmail}}).then(function (data, err) {
            if (data !== null) {
                console.log("user found - ready to edit");


                return sequelize.transaction(function (t) {

                    // chain all your queries here. make sure you return them.
                    return data.updateAttributes({
                        firstName: editUser.firstName,
                        lastName: editUser.lastName,
                        email: editUser.email,
                        roleId: editUser.role,
                        birthday: editUser.birthday,
                        sex: editUser.sex,
                        password: editUser.password

                    }, {transaction: t})

                }).then(function (result) {
                    console.log("Transaction has been committed - user with email: " + result.email + ", has been updated and saved to the DB");
                    callback(result);

                    // Transaction has been committed
                    // result is whatever the result of the promise chain returned to the transaction callback
                }).catch(function (err) {
                    console.log(err);
                    callback(userUpdated);
                    // Transaction has been rolled back
                    // err is whatever rejected the promise chain returned to the transaction callback
                });
            } else {
                console.log(err);
                console.log("could not find: " + editUser.email);
                callback(userUpdated);
            }


        })


    }; // this edits user based on email.




function _userDelete(userEmail, callback) {
    var userDeleted = false;

    console.log("_userDelete is running. Finding: " + userEmail);
    User.find({where: {Email: userEmail}}).then(function (data, err) {
        if (data !== null) {
            console.log("user found - ready to DELETE");
            return sequelize.transaction(function (t) {

                // chain all your queries here. make sure you return them.
                return data.destroy({},
                    {transaction: t})

            }).then(function () {
                console.log("Transaction has been committed - user with email: " + userEmail + ", has been DELETED");
                userDeleted = true;
                callback(userDeleted);



                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                callback(userDeleted);

                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            });


        } else {
            console.log(err);
            console.log("could not find: " + userEmail);
            callback(userDeleted);
        }


    })


};  //this one deletes user based on email.


function _userGet(userEmail, callback) {
    var userFound3 = false;

    console.log("_userGet is running. Finding: " + userEmail);
    User.find({where: {Email: userEmail}}).then(function (data, err) {
        if (data !== null) {
            console.log("user with email: " + userEmail + " found. Name is: " + data.firstName);
            callback(data);

        } else {
            console.log(err);
            console.log("could not find: " + userEmail);
            callback(userFound3);

        }


    })


}; // this one "gets" a user based on email.



function _createCoffeeShop(newCoffeeShop, callback) // this creates a new CoffeeShop
{
    var coffeeShopCreated = false;

    console.log("newCoffeeShop is running.")
    CoffeeShop.find({where: {Email: newCoffeeShop.email}}).then(function (data) { //we check if the CoffeeShop exists based on it's unique email.
        if (data !== null){
            console.log("CoffeeShop found - email exists already - " + data.email)
            callback(coffeeShopCreated);
        } else {
            return sequelize.transaction(function (t) {

                // chain all your queries here. make sure you return them.
                return CoffeeShop.create({
                    email: newCoffeeShop.email,
                    brandName: newCoffeeShop.brandName,
                    address: newCoffeeShop.address,
                    phone: newCoffeeShop.phone

                }, {transaction: t})

            }).then(function (result) {
                console.log("Transaction has been committed - CoffeeShop has been saved to the DB");
                coffeeShopCreated = true;
                callback(coffeeShopCreated);

                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                callback(coffeeShopCreated);
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            })
        }
    })
}

function _deleteCoffeeShop(coffeeShopEmail, callback) {
    var coffeeShopDeleted = false;

    console.log("_deleteOrder is running. Finding: " + coffeeShopEmail);
    CoffeeShop.find({where: {Email: coffeeShopEmail}}).then(function (data, err) {
        if (data !== null) {
            console.log("CoffeeShop found - ready to DELETE");
            return sequelize.transaction(function (t) {

                // chain all your queries here. make sure you return them.
                return data.destroy({},
                    {transaction: t})

            }).then(function () {
                console.log("Transaction has been committed - CoffeeShop with email: " + data.email + ", has been DELETED");
                coffeeShopDeleted = true;
                callback(coffeeShopDeleted);



                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                callback(coffeeShopDeleted);

                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            });


        } else {
            console.log(err);
            console.log("could not find: " + coffeeShopEmail);
            callback(orderDeleted);
        }


    })


};  //this one deletes order based on id.

function _getCoffeeShop(coffeeShopEmail, callback) {
    var coffeeShopFound = false;

    console.log("_getCoffeeShop is running. Finding coffeeShop with email: " + coffeeShopEmail);
    CoffeeShop.find({where: {Email: coffeeShopEmail}}).then(function (data, err) {
        if (data !== null) {
            console.log("CoffeeShop with email: " + data.email + " found.");
            callback(data);

        } else {
            console.log(err);
            console.log("could not find: " + coffeeShopEmail);
            callback(coffeeShopFound);

        }


    })


};  // this one "gets" a CoffeeSHop based on CoffeeShop Email.


function _getAllCoffeeShops(callback) {
    var allCoffeeShopsFound = [];

    var log = function(inst)
    {

        allCoffeeShopsFound.push(inst.get());
    }

    console.log("getAllCoffeeShops is running.");
    CoffeeShop.findAll().then(function (data, err) {
        if (data !== null) {
            console.log("her er data: " + data)
            console.log("CoffeeShops found.");
            data.forEach(log);
            callback(allCoffeeShopsFound);

        } else {
            console.log(err);
            allCoffeeShopsFound = false;
            console.log("could not find any CoffeeShops");
            callback(false);

        }


    })


};  // this one "gets" all CoffeeShops.

function _coffeeShopPut(coffeeShopEmail, editCoffeeShop, callback) {
    var coffeeShopUpdated = false;

    console.log("_coffeeShopPut is running. Finding: " + coffeeShopEmail);
    CoffeeShop.find({where: {Email: coffeeShopEmail}}).then(function (data, err) {
        if (data !== null) {
            console.log("CoffeeShop found - ready to edit");


            return sequelize.transaction(function (t) {

                // chain all your queries here. make sure you return them.
                return data.updateAttributes({
                    email: editCoffeeShop.email,
                    brandName: editCoffeeShop.brandName,
                    address: editCoffeeShop.address,
                    phone: editCoffeeShop.phone

                }, {transaction: t})

            }).then(function () {
                console.log("Transaction has been committed - CoffeeShop with email: " + editCoffeeShop.email + ", has been updated and saved to the DB");
                coffeeShopUpdated = true;
                callback(coffeeShopUpdated);

                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                callback(coffeeShopUpdated);
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            });
        } else {
            console.log(err);
            console.log("could not find: " + editCoffeeShop.email);
            callback(coffeeShopUpdated);
        }


    })


}; // this edits CoffeeShop based on email.

function _createOrder(currentUser, newOrder, callback) // This creates a new order - belonging to a user through the userId and a coffeeShop through CoffeeShopId
{
        var orderCreated = false;
        console.log("_createOrder is running.")

                return sequelize.transaction(function (t) {
                    // chain all your queries here. make sure you return them.
                    return Order.create({
                        userId: currentUser.id,
                        coffeeShopId: newOrder.coffeeShopId,
                        platform: newOrder.platform

                    }, {transaction: t})

                }).then(function (result) {
                    console.log("Transaction has been committed - Order has been saved to the DB - to user with ID: " + currentUser.id);
                    orderCreated = true;
                    callback(orderCreated);

                    // Transaction has been committed
                    // result is whatever the result of the promise chain returned to the transaction callback
                }).catch(function (err) {
                    console.log(err);
                    callback(orderCreated);
                    // Transaction has been rolled back
                    // err is whatever rejected the promise chain returned to the transaction callback
                })



}

function _deleteOrder(orderId, callback) {
    var orderDeleted = false;

    console.log("_deleteOrder is running. Finding: " + orderId);
    Order.find({where: {id: orderId}}).then(function (data, err) {
        if (data !== null) {
            console.log("Order found - ready to DELETE");
            return sequelize.transaction(function (t) {

                // chain all your queries here. make sure you return them.
                return data.destroy({},
                    {transaction: t})

            }).then(function () {
                console.log("Transaction has been committed - order with id: " + orderId + ", has been DELETED");
                orderDeleted = true;
                callback(orderDeleted);



                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                callback(orderDeleted);

                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            });


        } else {
            console.log(err);
            console.log("could not find: " + orderId);
            callback(orderDeleted);
        }


    })


};  //this one deletes order based on id.

function _getOrder(orderId, callback) {
    var orderFound = false;

    console.log("_getOrder is running. Finding order with ID: " + orderId);
    Order.find({where: {id: orderId}}).then(function (data, err) {
        if (data !== null) {
            console.log("Order with id: " + orderId + " found.");
            callback(data);

        } else {
            console.log(err);
            console.log("could not find: " + orderId);
            callback(orderFound);

        }


    })


}; // this one "gets" an order based on orderId.

function _getAllOrdersByUser(userEmail, callback) {
    var allOrdersByUser = [];

    _userGet(userEmail, function (data) {
        var log = function(inst)
        {
            allOrdersByUser.push(inst.get());
        }

        console.log("_getAllOrdersByUser is running.");
        console.log(" her er users email " + data.email + " og her er hans id: " + data.id);
        Order.findAll({where: {userId: data.id}}).then(function (data, err) {
            if (data !== null) {
                console.log("Orders found - her er orders: " + data);
                data.forEach(log);
                callback(allOrdersByUser);

            } else {
                console.log(err);
                console.log("could not find any Orders");
                callback(false);

            }


        })



    })


};  // this one "gets" all CoffeeShops.

function _createOrderItem(newOrderItem, callback) // This creates a new order - belonging to a user through the userId and a coffeeShop through CoffeeShopId
{
    var orderItemCreated = false;

    console.log("newCoffeeShop is running.")
    Order.find({where: {id: newOrderItem.orderId}}).then(function (data) { //we check if the order exists based on it's id.
        if (data == null){
            console.log("Order not found");
            callback(orderItemCreated);
        } else {
            return sequelize.transaction(function (t) {
                console.log("Order with ID " + data.id + " found. Will insert orderItem.")
                // chain all your queries here. make sure you return them.
                return OrderItem.create({
                    Order_ID: newOrderItem.orderId,
                    CoffeeKind_ID: newOrderItem.coffeeKindId,
                    quantity: newOrderItem.quantity

                }, {transaction: t})

            }).then(function (result) {
                console.log("Transaction has been committed - OrderItem has been added to the DB - to order with ID: " + data.id);
                orderItemCreated = true;
                callback(orderItemCreated);

                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                callback(orderItemCreated);
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            })
        }
    })
}





module.exports = {newUser : _newUser, newRole : _newRole, userPut : _userPut, userDelete : _userDelete, userGet : _userGet, createCoffeeShop: _createCoffeeShop,
deleteCoffeeShop : _deleteCoffeeShop, createOrder : _createOrder, createOrderItem : _createOrderItem, deleteOrder : _deleteOrder, orderGet: _getOrder,
getCoffeeShop : _getCoffeeShop, coffeeShopPut : _coffeeShopPut, getAllCoffeeShops : _getAllCoffeeShops, getAllOrdersByUser : _getAllOrdersByUser}; // Export Module

