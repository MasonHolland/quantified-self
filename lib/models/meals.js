const $ = require('jquery');
const api = "https://fierce-savannah-17132.herokuapp.com/api/v1/meals"
const Food = require('../models/food');

class Meal {
  constructor(data) {
    this.name = data.name;
    this.foods = newFoods(data.foods);
  };

  static requestAllMeals() {
    return $.getJSON(api, function(data) {
      this.mealsLength = data.length
      return data;
    });
  };

  static deleteAllFoods(foodID) {
    debugger;
    for (var i = 0; i < mealsLength.length ; i++) {
      $.ajax({
        method: "DELETE",
        url: ("$(api)/$(i)/foods/$(foodID)")
      }
    )}
  }
}
function newFoods(foods) {
  mealFoods = []
  foods.forEach(function(key, val) {
    mealFoods.push(new Food(key))
  });
  return mealFoods
};

module.exports = Meal
