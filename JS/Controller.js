/**
 * Created by dino on 29-09-2016.
 */


var userClass = require('./User.js');
var db = require('./DataBaseFacade.js');



var test = new userClass.newUser("test1", "testEfternavn", "lars1@gmail.com", 1, "09/09/2010", "male", 12345);
var test2 = new userClass.newUser("test2", "testEfternavn2", "lars2@gmail.com", 2, "09/01/2010", "female", 2341);
var updateTest = new userClass.newUser("test3", "testEfternavn", "lars2@gmail.com", 1, "09/09/2010", "male", 12345);
var updateTest2 = new userClass.newUser("test4", "testEfternavn", "lars@gmail.com", 1, "09/09/2010", "male", 12345);




// var a;
//
// db.newRole("Admin", function(data) {
//     a = data;
//     console.log("Created role in DB - " + a);
//
// });
//
// var b;
//
// db.newRole("User", function(data) {
//     b = data;
//     console.log("Created role in DB - " + b);
//
// });

// var c;
//
// db.newUser(test, function(data) {
//     c = data;
//     console.log("User created and saved to the DB - " + c);
//
// });
//
// var d;
//
// db.newUser(test2, function(data) {
//     d = data;
//     console.log("User created and saved to the DB - " + d);
//
// });

// var e;
//
// db.userPut("lars@gmaile.com", updateTest, function(data){
//     e = data;
//     console.log("User updated - " + e);
// });

// var f;
//
// db.userPut("lars2@gmail.com", updateTest2, function(data){
//     f = data;
//     console.log("User updated - " + f);
// });



// var g;
//
// db.userDelete("lars2@gmail.com", function(data) {
//     g = data;
//     console.log("will delete user " + g);
//
// });


// var h;
//
// db.userGet("lars@gmail.com", function(data) {
//     h = data;
//     console.log("Found user - " + h.firstName);
//
// });





