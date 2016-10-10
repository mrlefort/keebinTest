/**
 * Created by dino on 07-10-2016.
 */


var userClass = require('./User.js');
var db = require('./DataBaseCreation.js');
var Sequelize = require('sequelize'); // Requires
var Role = db.Role();
var User = db.User();
var Logins = db.Logins();
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

function _newRole(RoleN) {



    var runIfRoleFoundFalse = function (doesRoleExist) {
        // runIfRoleFoundFalse is the second function (the callback) - we feed RoleFound as a parameter and name is doesRoleExist
        if (doesRoleExist == false) {
            return sequelize.transaction(function (t) {

                // chain all your queries here. make sure you return them.
                return Role.create({
                    roleName: RoleN


                }, {transaction: t}) // kom her til

            }).then(function (result) {
                console.log("Transaction has been committed - Role has been saved to the DB.");

                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            });
        } else {
            console.log("couldn't create role " );
        };
    }


    var setRoleFound = function (callback) {
        //setROleFound is the first function to run.

        console.log("setRoleFound is running. ")
        Role.find({where: {RoleName: RoleN}}).then(function (data) { // we have run the callback inside the .then
            var RoleFound;
            if (data !== null){
            console.log("role found " + data.roleName)
            RoleFound = true;} else {
            RoleFound = false;
            }
            //we give RoleFound to callback
            callback(RoleFound);

        })






    };

    setRoleFound(runIfRoleFoundFalse);


}



function _newUser(newUser)
{

    var runIfUserFoundIsFalse = function (doesUserExist) {
        // runIfUserFoundIsFalse is the second function (the callback) - we feed userFound as a parameter and name is doesUserExist
        if (doesUserExist == false) {
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

                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            });
        } else {
            console.log("couldn't create user" );
        };
    }


    var setUserFound = function (callback) {
        //setUserFound is the first function to run.

        console.log("setUserFound is running. ")
        User.find({where: {Email: newUser.email}}).then(function (data) { // we have run the callback inside the .then
            var userFound;
            if (data !== null){
                console.log("user found - email exists already - " + data.email)
                userFound = true;} else {
                userFound = false;
            }
            //we give RoleFound to callback
            callback(userFound);

        })






    };

    setUserFound(runIfUserFoundIsFalse);



}

function _newPass(newUser)
{
    var finduserid = "";
    // finds a row in the user table with the email of newuser.email and then sets the finduserid to the user's id.
    User.find({where:{Email: newUser.email}}).then(function (data, err) {
        if (data) {
            finduserid = data.id;
        }
    })




    return sequelize.transaction(function (t) {

        // chain all your queries here. make sure you return them.
        return Logins.create({
            password: newUser.password,
            userId: finduserid


        },    {transaction: t}) // kom her til

    }).then(function (result) {
        console.log("Transaction has been committed");



        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(function (err) {
        console.log(err);
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
} // Export Functions

// user.find({where:{email: test2.email}}).then(function (data, err) {
//
//         console.log(data.id);
//
// })  // // Search Example

module.exports = {newPass : _newPass, newUser : _newUser, newRole : _newRole}; // Export Module
