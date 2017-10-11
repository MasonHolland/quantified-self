const $ = require('jquery');
const apiUrl = require('../config/apiUrl');

class Food {
  constructor(data) {
    this.id       = data.id;
    this.name     = data.name;
    this.calories = data.calories;
  }
};

module.exports = Food;
