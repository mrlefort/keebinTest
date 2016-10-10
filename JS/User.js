/**
 * Created by dino on 29-09-2016.
 */



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

module.exports = {newUser : _newUser}; // Export Module




