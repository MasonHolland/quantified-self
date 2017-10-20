const $ = require('jquery');
const apiUrl = require('../config/apiUrl');
const AjaxRequests = require('../helpers/ajaxHelper')


class Food {
  constructor(data) {
    this.id       = data.id;
    this.name     = data.name;
    this.calories = data.calories;
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

module.exports = Food;
