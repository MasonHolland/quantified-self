const $ = require('jquery');
const api = "https://fierce-savannah-17132.herokuapp.com/api/v1/meals"
const Food = require('../models/food');
const AjaxRequests = require('../helpers/ajaxHelper')

class Meal {
  constructor(data) {
    this.id = data.id;
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
      resolve (AjaxRequests.deleteAllFoods(foodID))})
  }

  static addMealFood(mealID, foodID) {
    return new Promise((resolve) => {
      resolve (AjaxRequests.addMealFood(mealID, foodID))})
  }

  static deleteFood(mealID, foodID) {
    return new Promise((resolve) => {
      resolve (AjaxRequests.deleteMealFood(mealID, foodID))})
  }

  static checkRemainingCalories(name) {
    if (name == "Dinner") {
      return 800
    } else if (name == "Lunch") {
      return 600
    } else if (name == "Breakfast") {
      return 400
    } else if (name == "Snack") {
      return 200
    }
  }
}
function newFoods(foods) {
  mealFoods = []
  foods.forEach(function(key, val) {
    if (AjaxRequests.foodExists(key.id)) {
      mealFoods.push(new Food(key))
    } else {
    }
  });
  return mealFoods
};


module.exports = Meal
