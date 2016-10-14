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


}  //create role if roleN does not exist already.



function _newUser(newUser)
{
    var userCreated = false;
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
                userCreated = true;
                return userCreated;

                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                return userCreated;
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


function _userPut(userEmail, editUser) {
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
                    return userUpdated;

                    // Transaction has been committed
                    // result is whatever the result of the promise chain returned to the transaction callback
                }).catch(function (err) {
                    console.log(err);
                    return userUpdated;
                    // Transaction has been rolled back
                    // err is whatever rejected the promise chain returned to the transaction callback
                });
            } else {
                console.log(err);
                console.log("could not find: " + editUser.email);
            }


        })


    };




function _userDelete(userEmail) {
    var userDeleted = false;

    console.log("_userDelete is running. Finding: " + userEmail);
    User.find({where: {Email: userEmail}}).then(function (data, err) {
        if (data !== null) {
            console.log("user found - ready to DELETE");
            deleteUser(data);


        } else {
            console.log(err);
            console.log("could not find: " + userEmail);
            return userDeleted;
        }


    })


    var deleteUser = function (data) {


        return sequelize.transaction(function (t) {

            // chain all your queries here. make sure you return them.
            return data.destroy({},
                {transaction: t})

        }).then(function () {
            console.log("Transaction has been committed - user with email: " + userEmail + ", has been DELETED");
            userDeleted = true;
            return userDeleted;

            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
        }).catch(function (err) {
            console.log(err);
            return userDeleted;
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
        });

    }




};









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

module.exports = {newPass : _newPass, newUser : _newUser, newRole : _newRole, userPut : _userPut, userDelete : _userDelete}; // Export Module
