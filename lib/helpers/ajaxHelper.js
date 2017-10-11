const $ = require('jquery')
const Food = require('../models/food')
const apiUrl = require('../config/apiUrl')

class ajaxRequests {
  static requestAllFood() {
    return $.getJSON(`${apiUrl}/foods`, (data) => {
      return data;
    });
  }
}

module.exports = ajaxRequests
