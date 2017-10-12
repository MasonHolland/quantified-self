const $ = require('jquery')
const Food = require('../models/food')
const apiUrl = require('../config/apiUrl')

class AjaxRequests {
  static requestAllFood() {
    return $.getJSON(`${apiUrl}/foods`, (data) => {
      return data;
    })
  }

  static deleteFood(id) {
    $.ajax({
      method: "DELETE",
      url: (`${apiUrl}/${id}`)
    })
  }

  static createNewFood(name, calories) {
    $.post( `${apiUrl}/foods`, { food: {
      name: name,
      calories: calories
    }});
  }
}

module.exports = AjaxRequests
