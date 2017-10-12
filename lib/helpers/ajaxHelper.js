const $ = require('jquery')
const Food = require('../models/food')
const apiUrl = require('../config/apiUrl')

class ajaxRequests {
  static requestAllFood() {
    return $.getJSON(`${apiUrl}/foods`, (data) => {
      return data;
    });
  }
  static deleteFood(id) {
    $.ajax({
      method: "DELETE",
      url: (apiUrl + "/" + id)
    })
  }

  static addFood(name, calories) {
    $.post(apiUrl + "/foods", { food: {
      name: name,
      calories: calories
    }});
  }
}

module.exports = ajaxRequests
