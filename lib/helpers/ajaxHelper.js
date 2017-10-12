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
  static deleteFood(id) {
    return $.ajax({
      method: "DELETE",
      url: (`${apiUrl}/foods/` + id)
    })
  }

  static addFood(name, calories) {
    $.post(apiUrl + "/foods", { food: {
      name: name,
      calories: calories
    }});
  }

  static getIndFood(id) {
    return $.get(apiUrl +"/foods/" + id)
  }

  static foodExsists(key) {
    var result = true
    this.getIndFood(key).then(function(data) {
      result = true;
    })
    .catch(function(){
      result = false;
    })
    return result;
  }
}

module.exports = AjaxRequests