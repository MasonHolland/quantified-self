const $ = require('jquery');
const apiUrl = require('../config/apiUrl');
const AjaxRequests = require('../helpers/ajaxHelper')
let allFoods;

class Food {
  constructor(data) {
    this.id       = data.id;
    this.name     = data.name;
    this.calories = data.calories;
    this.allFoods = null;
  }
  static requestAllFood() {
    return AjaxRequests.requestAllFood()
  }

  static addFood(name, calories) {
    return new Promise((resolve) => {
      resolve(AjaxRequests.addFood(name, calories))
    })
  }

  static deleteFood(id) {
    return new Promise((resolve) => {
      resolve(AjaxRequests.deleteFood(id))
    })
  }
};

module.exports = Food
