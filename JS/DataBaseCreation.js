/**
 * Created by dino on 03-02-2013.
 */


var Sequelize = require('sequelize'); // Requires

var sequelize = new Sequelize('keebin', 'keebin', '1234', {
    host: "localhost",
    port: 3306,
    dialect: 'mysql'
}); // Establishing connection to the MySQL database schema called keebin

sequelize.authenticate().then(function (err) {
    if (err) {
        console.log('There is connection in ERROR');
    } else {
        console.log('Connection has been established successfully');
    }
});  // Authenticate Database connection

var role = sequelize.define('roles', {
    roleName: {
        type: Sequelize.STRING,
        Validate : {notNull : true, unique : true}
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

});   // role table setup

var user = sequelize.define('user', {

    firstName: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        field: 'first_name', // Will result in an attribute that is firstName when user facing but first_name in the database
        Validate : {max : 40}
    },
    lastName: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        Validate : {max : 40}
    },
    email: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        Validate : {notNull : true, isEmail: true, unique : true}
    },
    birthday: {
        type: Sequelize.DATE, // here we decide parameters for this field in the table
        Validate : {isDate : true, notNull : false}
    },
    sex: {
        type: Sequelize.STRING // here we decide parameters for this field in the table
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true // fjerner timestamps med false denne option skal stå på tabellen

});  // user table setup

var logins = sequelize.define('logins', {
    password: {
        type: Sequelize.STRING,
        Validate : {notNull : true}
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

});  // passwords table setup

var coffeeBrand = sequelize.define('coffeeBrand', {
    brandName: {
        type: Sequelize.STRING,
        Validate : {notNull : true}
    },
    numberOfCoffeeNeeded: {
        type: Sequelize.INTEGER,
        Validate : {notNull : true}
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

}); // coffeeBrand table setup

var loyalityCards = sequelize.define('loyaltyCards', {
    numberOfCoffeesBought: {
        type: Sequelize.INTEGER,
        Validate : {notNull : true},
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true // fjerner timestamps med false denne option skal stå på tabellen

}); // loyalityCards table setup

var coffeeKind = sequelize.define('coffeeKind', {
    price: {
        type: Sequelize.DOUBLE,
        Validate : {notNull : true},
    },
    coffeeKindName: {
        type: Sequelize.STRING,
        Validate : {notNull : true},
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

}); // coffeeKind table setup

var order = sequelize.define('order', {
    platform: {
        type: Sequelize.STRING,
        Validate : {notNull : true},
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true // fjerner timestamps med false denne option skal stå på tabellen

}); // order table setup

var coffeeShop = sequelize.define('coffeeShop', {
    email: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        Validate : {notNull : true, isEmail: true, unique : true}
    },
    address: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        Validate : {notNull : true}
    },
    phone: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        Validate : {notNull : true}
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

}); // coffeeShop table setup

var coffeeShopUsers = sequelize.define('coffeeShopUsers', {

}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

}); // coffeeShopUsers table setup

var orderItem = sequelize.define('orderItem', {
    quantity: {
        type: Sequelize.INTEGER, // here we decide parameters for this field in the table
        Validate : {notNull : true}
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

}); // orderItem table setup

role.hasMany(user, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'});
user.belongsTo(role, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'});
user.hasOne(logins, {foreignKey: 'email'});
logins.belongsTo(user, {foreignKey: 'email'});
user.hasMany(loyalityCards);
loyalityCards.belongsTo(user);
coffeeBrand.hasMany(loyalityCards, {foreignKey: 'brandName'});
loyalityCards.belongsTo(coffeeBrand, {foreignKey: 'brandName'});



coffeeShop.hasMany(coffeeKind);
coffeeKind.belongsTo(coffeeShop);

user.hasMany(order);
order.belongsTo(user);
coffeeShop.hasMany(order);
order.belongsTo(coffeeShop);
user.hasMany(order);
order.belongsTo(coffeeKind);

coffeeShop.belongsTo(coffeeBrand, {foreignKey: 'brandName'})



order.belongsToMany(coffeeKind, {through: 'orderItem', foreignKey: 'Order_ID'});
coffeeKind.belongsToMany(order, {through: 'orderItem', foreignKey: 'CoffeeKind_ID'}); // Working with  // associations
coffeeBrand.sync();


role.sync();

user.sync(); // executes the command from above and inserts a new table into the database
logins.sync();
loyalityCards.sync();

coffeeKind.sync();
order.sync();
coffeeShop.sync();
coffeeShopUsers.sync();
orderItem.sync(); // Creating Tables
function _Role()
{
 return role;
}

function _User()
{
return user;
}

function _Logins()
{
return logins;
}

function _CoffeeBrand()
{
    return coffeeBrand;
}

function _LoyaltyCards()
{
    return loyalityCards;
}

function _CoffeeKind()
{
    return coffeeKind;
}

function _Order()
{
    return order;
}

function _CoffeeShop()
{
    return coffeeShop;
}

function _CoffeeShopUsers()
{
    return coffeeShopUsers;
}

function _OrderItem()
{
    return orderItem;
}

function _connect()
{
    return sequelize;
}
// Export Functions // Export Functions

module.exports = {Role : _Role, User : _User, Logins : _Logins, CoffeeBrand : _CoffeeBrand,
LoyaltyCards : _LoyaltyCards, CoffeeKind : _CoffeeKind, Order : _Order, CoffeeShop : _CoffeeShop,
CoffeeShopUsers : _CoffeeShopUsers, OrderItem : _OrderItem, connect : _connect}; // Export Module