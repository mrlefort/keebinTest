/**
 * Created by dino on 29-09-2016.
 */


var userClass = require('./User.js');
var db = require('./DataBaseFacade.js');


var test = new userClass.newUser("test", "testEfternavn", "john@gmaile.com", 1, "09/09/2010", "male", 12345);
var test2 = new userClass.newUser("test2", "testEfternavn2", "johna@gmailr.com", 2, "09/01/2010", "female", 2341);


// db.newRole("Admin");
// db.newRole("user");

db.newUser(test);
db.newUser(test2);




