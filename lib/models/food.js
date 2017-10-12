const $ = require('jquery');
const apiUrl = require('../config/apiUrl');
const ajaxRequests = require('../helpers/ajaxHelper')


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
    return ajaxRequests.addFood(name, calories)
  }
};

module.exports = Food;
