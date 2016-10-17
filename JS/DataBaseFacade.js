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

                }).then(function () {
                    console.log("Transaction has been committed - user with email: " + editUser.email + ", has been updated and saved to the DB");
                    userUpdated = true;
                    callback(userUpdated);

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













module.exports = {newUser : _newUser, newRole : _newRole, userPut : _userPut, userDelete : _userDelete, userGet : _userGet}; // Export Module

