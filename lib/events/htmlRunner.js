const $ = require('jquery');
const HTMLHelper = require('../helpers/htmlHelper')
const $foodTable  = $('.food-table-body');
const ajaxRequests = require('../helpers/ajaxHelper')


class HTMLRunner {
  static formTable(foods) {
    var htmlFoods = [];
    $.each( foods, function( key, val ) {
      htmlFoods.push( HTMLHelper.newTableEntry(val));
    });
    htmlFoods.forEach(function(food) {
      $(".food-table-body").append(food);
    });
  };

  static refreshFoodTable() {
    $foodTable.children().remove();
    var formTable = this.formTable
    ajaxRequests.requestAllFood().then(function(data) {
      formTable(data)
    });
  };
};

module.exports = HTMLRunner
