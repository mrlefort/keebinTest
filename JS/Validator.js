/**
 * Created by noncowi on 25-10-2016.
 */
function _valRole(role) {
    if (role == null || role.equals('')) {
        //return 'Role not defined'
        return false;
    } else if (role.length > 34) {
        //return 'RoleName is too long'
        return false
    } else return true
}
function _valUser(user) {
    if (user == null || user.equals('')) {
        //return 'User not defined'
        return false
    } else if (user.email == null || user.email.equals('') || !user.email.isEmail) {
        //return user email not defined'
        return false
    } else if (user.password == null || user.password.equals('')) {
        return false
    } else if (user.role == null || user.role.equals('')) {
        return false
    } else return true

}

function _valEmail(email) {
    if (!email.isEmail) {
        return false
    } else return true
}
function _valCoffeeshop(coffeeshop) {
    if (!coffeeshop.email.isEmail || coffeeshop == null || coffeeshop.equals('')) {
        return false
    } else if (coffeeshop.brandName == null || coffeeshop.brandName.equals('')) {
        return false
    } else if (coffeeshop.address == null || coffeeshop.address.equals('')) {
        return false
    } else if (coffeeshop.phone == null || coffeeshop.phone.equals('')) {
        return false
    } else return true
}
function _valID(ID) {
    if (ID == null || ID.equals('')) {
        return false
    } else return true
}
function _valOrder(order) {
    if (order == null || order.equals('')) {
        return false
    } else if (order.coffeeShopId == null || order.coffeeShopId.equals('')) {
        return false
    } else if (order.platform == null || order.platform.equals('')) {
        return false
    } else return true
}
function _valOrderItem(orderItem){
    if(orderItem == null || orderItem.equals('')){
        return false
    }else if (orderItem.coffeeKindId == null || orderItem.coffeeKindId.equals('')){
        return false
    }else if (orderItem.orderId == null | orderItem.orderId.equals('')){
        return false
    }else if (orderItem.quantity == null || orderItem.quantity.equals('') ){
        return false
    }else return true
}
function _valBrand(CoffeeBrandName, NumbersOfCoffeeNeeded){
    if (CoffeeBrandName == null || CoffeeBrandName.equals('')) {
        //return 'Role not defined'
        return false;
    } else if (NumbersOfCoffeeNeeded == null || NumbersOfCoffeeNeeded.equals('')) {
        //return 'Rolename not defined'
        return false
    } else return true
}
function _valNumber(number){
    if(number == null || number.equals(0)){
        return false
    }else return true
}
module.exports = {valOrderItem: _valOrderItem, valOrder: _valOrder, valID:_valID, valCoffeeshop: _valCoffeeshop,
    valEmail:_valEmail, valUser: _valUser, valRole: _valRole, valBrand: _valBrand, valNumber: _valNumber}