/**
 * Created by mrlef on 10/19/2016.
 */
var orderId;
var coffeeKindId;
var quantity;


function _newOrderItem(orderId, coffeeKindId, quantity)
{
    this.orderId = orderId;
    this.coffeeKindId = coffeeKindId;
    this.quantity = quantity;

}


// Export Functions

module.exports = { newOrderItem : _newOrderItem}; // Export Module