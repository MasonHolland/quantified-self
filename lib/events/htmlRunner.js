const $ = require('jquery');
const HTMLHelper = require('../helpers/htmlHelper')
const $foodTable  = $('.food-table-body');
const ajaxRequests = require('../helpers/ajaxHelper')


class HTMLRunner {
  static refreshFoodTable() {
    $foodTable.children().remove();
    ajaxRequests.requestAllFood().then(function(data) {
      debugger;
      formTable(data)
    });
  };

  static formTable(foods) {
    var htmlFoods = [];
    $.each( foods, function( key, val ) {
      htmlFoods.push( HTMLHelper.newTableEntry(val));
    });
    htmlFoods.forEach(function(food) {
      $(".food-table-body").append(food);
    });
  };
};

module.exports = HTMLRunner
