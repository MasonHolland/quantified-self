const $ = require('jquery')
const Food = require('../models/food')
const apiUrl = require('../config/apiUrl')

class AjaxRequests {
  static requestAllFood() {
    return $.getJSON(`${apiUrl}/foods`);
  }

  static deleteFood(id) {
    return $.ajax({
      method: "DELETE",
      url: (`${apiUrl}/foods/${id}`)
    })
  }

  static addFood(name, calories) {
    return $.post(`${apiUrl}/foods`, { food: {
      name: name,
      calories: calories
    }});
  }

  static updateFood(name, calories, id) {
    return $.ajax({
      method: "PATCH",
      url: (apiUrl + "/foods/" + id),
      data: { food: { name: name, calories: calories}}
    })
  }

  static getIndFood(id) {
    return $.get(apiUrl +"/foods/" + id)
  }

  static foodExsists(key) {
    var result = true
    this.getIndFood(key)
      .then(function(data) {
        result = true;
      })
      .catch(function(){
        result = false;
      })
    return result;
  }

  static deleteAllFoods(foodID) {
    for (var i = 1; i < 5 ; i++) {
      $.ajax({
        method: "DELETE",
        url: (apiUrl + '/meals/' + i + '/foods/' + foodID)
      });
    }
    return;
  }
}

module.exports = AjaxRequests
