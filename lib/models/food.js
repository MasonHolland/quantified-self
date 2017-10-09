const $ = require('jquery');
const api = "https://fierce-savannah-17132.herokuapp.com/api/v1/foods"

class Food {
  constructor(data) {
    this.id       = data.id;
    this.name     = data.name;
    this.calories = data.calories;
  }

  static requestAllFood() {
    return $.getJSON(api, function(data) {
      return data;
    });
  };
};
module.exports = Food;
