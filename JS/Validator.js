/**
 * Created by noncowi on 06-11-2016.
 */
function _valRole(role,callback) {
    if (role == null || role == '') {
        //return 'Role not defined'
        callback(false)
    } else if (role.length > 34) {
        //return 'RoleName is too long'
        callback(false)
    } else callback(true)
}
function _valUser(email,password,role,callback) {
    if (email == null || email == '') {
        //return user email not defined'
        callback(false)
    } else if (password == null || password == '') {
        callback(false)
    } else if (role == null || role == '') {
        callback(false)
    } else callback(true)

}

function _valEmail(email,callback) {
    if (email == null) {
        callback(false)
    } else callback(true)
}
function _valCoffeeshop(coffeeShopEmail, brandName, address, phone, callback) {
    if ( coffeeShopEmail == null || coffeeShopEmail == '') {
        callback(false)
    } else if (brandName == null || brandName == '') {
        callback(false)
    } else if (address == null || address == '') {
        callback(false)
    } else if (phone == null || phone == '') {
        callback(false)
    } else callback(true)
}
function _valID(ID,callback) {
    if (ID == null || ID == '') {
        callback(false)
    } else callback(true)
}
function _valOrder(currentUser, coffeeShopId,platform,callback) {
    if (coffeeShopId == null || coffeeShopId == '') {
        callback(false)
    } else if (platform == null || platform == '') {
        callback(false)
    }else if(currentUser == null || currentUser == ''){
        callback(false)
    }else callback(true)
}
function _valOrderItem(coffeeKindId,orderId,quantity,callback){
    if (coffeeKindId == null || coffeeKindId == ''){
        callback(false)
    }else if (orderId == null | orderId == ''){
        callback(false)
    }else if (quantity == null || quantity == '' ){
        callback(false)
    }else callback(true)
}
function _valBrand(coffeeBrandId,CoffeeBrandName, NumbersOfCoffeeNeeded, callback){
    if (CoffeeBrandName == null || CoffeeBrandName == '') {
        //return 'Role not defined'
        callback(false)
    } else if (NumbersOfCoffeeNeeded == null || NumbersOfCoffeeNeeded == '') {
        //return 'Rolename not defined'
        callback(false)
    } else if(coffeeBrandId == null || coffeeBrandId == ''){
        callback(false)
    } else callback(true)
}
function _valNumber(number,callback){
    if(number == null || number == 0){
        callback(false)
    }else callback(true)
}
module.exports = {valOrderItem: _valOrderItem, valOrder: _valOrder, valID:_valID, valCoffeeshop: _valCoffeeshop,
    valEmail:_valEmail, valUser: _valUser, valRole: _valRole, valBrand: _valBrand, valNumber: _valNumber}