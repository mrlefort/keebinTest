/**
 * Created by mrlef on 10/18/2016.
 */


var platform;

function _newOrder(userId, coffeeShopId, platform)
{
    this.userId = userId;
    this.coffeeShopId = coffeeShopId;
    this.platform = platform;

}

// Export Functions

module.exports = { newOrder : _newOrder}; // Export Module