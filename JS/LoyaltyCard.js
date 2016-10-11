/**
 * Created by mrlef on 10/11/2016.
 */



var numberOfCoffeesBought;
var brand = "";
var userID = "";
var coffeesNeededForThisBrand;


function _newLoyaltyCard(brandName, userID, coffeesNeededForThisBrand)
{
    this.brandName = brandName;
    this.numberOfCoffeesBought = 1; //loyaltyCards bliver lavet når man første gang trykker "tilføj kop" til en branch.
    this.userID = userID;
    this.coffeesNeededForThisBrand = coffeesNeededForThisBrand;

}

// Export Functions

module.exports = {newLoyaltyCard : _newLoyaltyCard}; // Export Module
