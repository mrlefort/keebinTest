/**
 * Created by dino on 29-09-2016.
 */

var db = require('./DataBaseCreation.js');
var sequelize = db.connect();
var User = db.User();

var Sequelize = require('sequelize'); // Requires
var firstName = "";
var lastName = "";
var email = "";
var role = "";
var birthday = "";
var sex = "";
var password = ""; // Variable Creation

function _newUser(FirstName, LastName, Email, Role, Birthday, Sex, password)
{
    this.firstName = FirstName;
    this.lastName = LastName;
    this.email = Email;
    this.role = Role;
    this.birthday = Birthday;
    this.sex = Sex;
    this.password = password;

} // Export Functions


function _createUser(newUser, callback) // this creates a user
{
    var userCreated = false;

    console.log("createUser is running. ")
    User.find({where: {Email: newUser.email}}).then(function (data) { // we have run the callback inside the .then
        if (data !== null) {
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







function _putUser(userEmail, editUser, callback) {

    var userUpdated = false;

    console.log("userPutFind is running. Finding: " + userEmail);
    User.find({where: {Email: userEmail}}).then(function (data, err)
        {
            if (data !== null)
            {
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


        }
    )


}; // this edits user based on email.



function _deleteUser(userEmail, callback) {
    var userDeleted = false;

    console.log("_deleteUser is running. Finding: " + userEmail);
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


}; //this one deletes user based on email.



function _getUser(userEmail, callback) {
    var userFound3 = false;

    console.log("_getUser is running. Finding: " + userEmail);
    User.find({where: {Email: userEmail}}).then(function (data, err) {
            if (data !== null) {
                console.log("user with email: " + userEmail + " found. Name is: " + data.firstName);
                callback(data);

            } else {
                console.log(err);
                console.log("could not find: " + userEmail);
                callback(userFound3);


            }


        }
    )


}; // this one "gets" a user based on email.


function _getAllUsers(callback) {
    var allUsers = [];

    var log = function(inst)
    {

        allUsers.push(inst.get());
    }

    console.log("getAllUsers is running.");
    User.findAll().then(function (data, err) {
        if (data !== null) {
            console.log("her er Users: " + data)
            data.forEach(log);
            callback(allUsers);

        } else {
            console.log(err);
            console.log("could not find any Users");
            callback(false);

        }


    })


};  // this one "gets" all CoffeeShops.


function _getUserById(userId, callback)
{
    var userFound3 = false;

    console.log("_userGet is running. Finding: " + userId);
    User.find({where: {id: userId}}).then(function (data, err)
        {
            if (data !== null)
            {
                console.log("user with email: " + userId + " found. Name is: " + data.firstName);
                callback(data);

            } else
            {
                console.log(err);
                console.log("could not find: " + userId);
                callback(userFound3);
            }
        }
    )
}; //get one user from the DB by ID.

module.exports = {createNewUserObject : _newUser, getUserById : _getUserById, createUser : _createUser, putUser : _putUser, deleteUser : _deleteUser, getUser : _getUser, getAllUsers : _getAllUsers}; // Export Module




