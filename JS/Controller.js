/**
 * Created by dino on 29-09-2016.
 */



var db = require('./DataBaseFacade.js');



// the functions under this needs to be moved to db so calling db.new db.newLoyaltyCard('1', '3', '3') will result the same.
// lc.newLoyaltyCard('1', '1', '3', function(models) {

//     if(models == false)
//     {
//         console.log("if false.... ! " + models);
//     }
//     else {
//         console.log("if true...  - " + models);
//     }
// });
//
//
// lc.findLoyaltyCard('8', function(models) {
//     if(!models)
//     {
//         console.log("User has not been found");
//     }
//     else {
//         console.log("User has bought - " + models.numberOfCoffeesBought + " coffees with loyal card id - " + models.id);
//     }
// });
//
// lc.deleteLoyaltyCard('7', function(models) {
//
//     console.log("User has been deleted = " + models);
//
// });
//
// lc.editLoyaltyCard(8, 1, 3, 7, function(models) {
//
//


//     console.log("User has been updated = " + models);
//
// });

               //test data for users

//
// var test = new userClass.newUser("test1", "testEfternavn", "lars1@gmail.com", 1, "09/09/2010", "male", 12345);
// var test2 = new userClass.newUser("test2", "testEfternavn2", "lars2@gmail.com", 2, "09/01/2010", "female", 2341);
// var test3 = new userClass.newUser("test3", "testEfternavn3", "lars3@gmail.com", 3, "09/09/2010", "male", 12345);
//
// var updateTest = new userClass.newUser("test3", "testEfternavn", "lars2@gmail.com", 1, "09/09/2010", "male", 12345);
// var updateTest2 = new userClass.newUser("test4", "testEfternavn", "lars@gmail.com", 1, "09/09/2010", "male", 12345);
//



             //test functions for userCRUD - start


// db.createCoffeeShopUser("lars3@gmail.com", 1, function(status)
// {
//     console.log("her er status: " +status);
// });
// var john = [];
// var log = function(inst)
// {
//   john.push(inst.get());
// };
//

// db.getAllCoffeeShops( function(data)
// {
//     if(data !== false)
//     {
//         data.forEach(log);
//
//         console.log("her er john: " + john[0].id)
//         // var keys = Object.keys(data[0]);
//         // console.log("keys: " +keys);
//         console.log("data er ikke falsk : " + data);
//     }
//     else
//     {
//         console.log("fejl!");
//     }
// });


//
// var a;
//
// db.createRole("Admin", function(data) {
//     a = data;
//     console.log("Created role in DB - " + a);
//
// });
//
// var b;
//
// db.createRole("User", function(data) {
//     b = data;
//     console.log("Created role in DB - " + b);
//
// });


//
// var c;
//
// db.createUser(test, function(data) {
//     c = data;
//     console.log("User created and saved to the DB - " + c);
//
// });
//
// var d;
//

// db.createUser(test2, function(data) {

//     d = data;
//     console.log("User created and saved to the DB - " + d);
//
// });

// var e;
//
// db.putUser("lars1@gmail.com", updateTest, function(data){
//     e = data;
//     console.log("User updated - " + e.email);
//
// });

// var f;
//
// db.putUser("lars2@gmail.com", updateTest2, function(data){
//     f = data;
//     console.log("User updated - " + f);
// });



// var g;
//
// db.deleteUser("lars2@gmail.com", function(data) {
//     g = data;
//     console.log("will delete user " + g);
//
// });


// var h;
//
// db.getUser("lars@gmail.com", function(data) {
//     h = data;
//     console.log("Found user - " + h.firstName);
//
// });

// db.getAllUsers(function(data) {
//     console.log("her er full user data: " + data);
//     for(i = 0; i < data.length; i++)
//     {
//         console.log(data[i]);
//     }
// })



                 //test functions for userCRUD - end


                 //test data for CoffeeShop
// var testCoffeeShop = new coffeeShopClass.newCoffeeShop("coffeeShop2@gmail.com", 1, "Langelandsvej 1", 25417858);
//
//
// //test functions for CoffeeShop
// var i;
// db.createCoffeeShop(testCoffeeShop, function (data) {
//     i = data;
//     console.log("CoffeeShop created - " + i);
// });


                 // test data for Order
// var user;
// var testOrder = new orderClass.newOrder(1, "Android");
// db.getUser("lars1@gmail.com", function (data) {
//     user = data;
//
//     var j;
//     db.createOrder(user, testOrder, function (data) {
//         j = data;
//         console.log("Order created - " + j);
//     });
// });



//test functions for CoffeeShop



// var testOrderItem = new orderItemClass.newOrderItem(2, 1, 3);
//
//
// //test functions for CoffeeShop
// var k;
// db.createOrderItem(testOrderItem, function (data) {
//     k = data;
//     console.log("OrderItem created - " + k);
// });


// db.deleteCoffeeShop('coffeeShop@gmail.com', function (data) {
//     console.log("coffeeShop Deleted - " + data);
// })




// var l;
// db.deleteOrder(2, function (data){
//     l = data;
//     console.log("Order deleted - " + l);
// })

// var l;
// db.createRole("yoloo", function (data){
//     l = data;
//     console.log("Order created - " + l);
// })



// db.getAllCoffeeShops( function(data) {
//     console.log("her er full data: " + data);
//     for(i = 0; i < data.length; i++)
//     {
//         console.log(data[i]);
//     }
// })

// db.getAllOrdersByUser('lars1@gmail.com', function(data) {
//     console.log("her er full order data: " + data);
//         for(i = 0; i < data.length; i++)
//     {
//         console.log(data[i]);
//     }
// })
//
// db.createCoffeeShop('lars1@gmail.com', function(data) {
//     console.log("her er full order data: " + data);
//         for(i = 0; i < data.length; i++)
//     {
//         console.log(data[i]);
//     }
// })




