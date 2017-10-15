const $ = require('jquery');
const apiUrl = require('../config/apiUrl');
const ajaxRequests = require('../helpers/ajaxHelper')
let allFoods;

class Food {
  constructor(data) {
    this.id       = data.id;
    this.name     = data.name;
    this.calories = data.calories;
  }
  static requestAllFood() {
    return ajaxRequests.requestAllFood()
  }

  static addFood(name, calories) {
    return new Promise((resolve) => {
      resolve(ajaxRequests.addFood(name, calories))
    })
  }

  static deleteFood(id) {
    return new Promise((resolve) => {
      resolve(ajaxRequests.deleteFood(id))
    })
  }
};

module.exports = Food;
