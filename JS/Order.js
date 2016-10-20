/**
 * Created by mrlef on 10/18/2016.
 */


var db = require('./DataBaseCreation.js');
var sequelize = db.connect();
var Order = db.OrderItem();

var platform;

function _newOrder(coffeeShopId, platform)
{
    this.coffeeShopId = coffeeShopId;
    this.platform = platform;

}

function _createOrder(currentUser, newOrder, callback) // This creates a new order - belonging to a user through the userId and a coffeeShop through CoffeeShopId
{
    var orderCreated = false;
    console.log("_createOrder is running.")

    return sequelize.transaction(function (t) {
        // chain all your queries here. make sure you return them.
        return Order.create({
            userId: currentUser.id,
            coffeeShopId: newOrder.coffeeShopId,
            platform: newOrder.platform

        }, {transaction: t})

    }).then(function (result) {
        console.log("Transaction has been committed - Order has been saved to the DB - to user with ID: " + currentUser.id);
        orderCreated = true;
        callback(orderCreated);

        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(function (err) {
        console.log(err);
        callback(orderCreated);
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    })



}

function _deleteOrder(orderId, callback) {
    var orderDeleted = false;

    console.log("_deleteOrder is running. Finding: " + orderId);
    Order.find({where: {id: orderId}}).then(function (data, err) {
        if (data !== null) {
            console.log("Order found - ready to DELETE");
            return sequelize.transaction(function (t) {

                // chain all your queries here. make sure you return them.
                return data.destroy({},
                    {transaction: t})

            }).then(function () {
                console.log("Transaction has been committed - order with id: " + orderId + ", has been DELETED");
                orderDeleted = true;
                callback(orderDeleted);



                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                callback(orderDeleted);

                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            });


        } else {
            console.log(err);
            console.log("could not find: " + orderId);
            callback(orderDeleted);
        }


    })


};  //this one deletes order based on id.

function _getOrder(orderId, callback) {
    var orderFound = false;

    console.log("_getOrder is running. Finding order with ID: " + orderId);
    Order.find({where: {id: orderId}}).then(function (data, err) {
        if (data !== null) {
            console.log("Order with id: " + orderId + " found.");
            callback(data);

        } else {
            console.log(err);
            console.log("could not find: " + orderId);
            callback(orderFound);

        }


    })


}; // this one "gets" an order based on orderId.

function _getAllOrdersByUser(userEmail, callback) {
    var allOrdersByUser = [];

    _getUser(userEmail, function (data) {
        var log = function(inst)
        {
            allOrdersByUser.push(inst.get());
        }

        console.log("_getAllOrdersByUser is running.");
        console.log(" her er users email " + data.email + " og her er hans id: " + data.id);
        Order.findAll({where: {userId: data.id}}).then(function (data, err) {
            if (data !== null) {
                console.log("Orders found - her er orders: " + data);
                data.forEach(log);
                callback(allOrdersByUser);

            } else {
                console.log(err);
                console.log("could not find any Orders");
                callback(false);

            }


        })



    })


};  // this one "gets" all CoffeeShops.



// Export Functions

module.exports = {newOrder : _newOrder, getAllOrdersByUser : _getAllOrdersByUser, getOrder : _getOrder, deleteOrder : _deleteOrder, createOrder : _createOrder}; // Export Module