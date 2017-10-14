const $ = require('jquery');
const api = "https://fierce-savannah-17132.herokuapp.com/api/v1/meals"
const Food = require('../models/food');
const ajaxRequests = require('../helpers/ajaxHelper')

class Meal {
  constructor(data) {
    this.name = data.name;
    this.foods = newFoods(data.foods);
  };

  static requestAllMeals() {
    return $.getJSON(api, function(data) {
      return data;
    });
  };

  static deleteAllFoods(foodID) {
    return new Promise((resolve) => {
      resolve (function() {
        for (var i = 1; i < 5 ; i++) {
        $.ajax({
          method: "DELETE",
          url: (api + '/' + i + '/foods/' + foodID)
        })
      }})
    })
  }
}
function newFoods(foods) {
  mealFoods = []
  foods.forEach(function(key, val) {
    if (ajaxRequests.foodExists(key.id)) {
      mealFoods.push(new Food(key))
    } else {
    }
  });
  return mealFoods
};

module.exports = Meal
