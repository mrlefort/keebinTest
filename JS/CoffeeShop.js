/**
 * Created by mrlef on 10/18/2016.
 */

var email;
var address;
var phone;
var coffeeKinds = [];
var brandName;

function _newCoffeeShop(email, brandName, address, phone)
{
    this.email = email;
    this.brandName = brandName;
    this.address = address;
    this.phone = phone;

}


// Export Functions

module.exports = { newCoffeeShop : _newCoffeeShop}; // Export Module