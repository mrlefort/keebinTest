/**
 * Created by dino on 29-09-2016.
 */


var userClass = require('./User.js');
var db = require('./DataBaseFacade.js');


var lars = new userClass.newUser("Lars", "Johnson", "john@gmaile.com", "10/09/2016", 1, "09/09/2010", "male", 12345);
var larse = new userClass.newUser("Larse", "Johnsona", "johna@gmailr.com", "10/09/1016", 2, "09/01/2010", "female", 2341);

db.newRole("Martin3");
db.newRole("Admin");
db.newRole("User");

// db.newUser(lars);
// db.newUser(larse);




