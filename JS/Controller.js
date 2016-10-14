/**
 * Created by dino on 29-09-2016.
 */


var userClass = require('./User.js');
var db = require('./DataBaseFacade.js');


var test = new userClass.newUser("test1", "testEfternavn", "john@gmaile.com", 1, "09/09/2010", "male", 12345);
var test2 = new userClass.newUser("test2", "testEfternavn2", "lars@gmail.com", 2, "09/01/2010", "female", 2341);
var updateTest = new userClass.newUser("test3", "testEfternavn", "lars2@gmail.com", 1, "09/09/2010", "male", 12345);
var updateTest2 = new userClass.newUser("test4", "testEfternavn", "lars@gmail.com", 1, "09/09/2010", "male", 12345);

// db.newRole("Admin");
// db.newRole("user");

// db.newUser(test);
// db.newUser(test2);

// db.userPut("lars@gmail.com", updateTest);
// db.userPut("lars2@gmail.com", updateTest2);

// db.userDelete("lars@gmail.com");


db.userGet("lars2@gmail.com");
