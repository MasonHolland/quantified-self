const $ = require('jquery');
const HTMLHelper = require('../helpers/htmlHelper')
const $foodTable  = $('.food-table-body');
const AjaxRequests = require('../helpers/ajaxHelper')
const Food = require('../models/food');

class HTMLRunner {

  static formTable(foods, table) {
    var htmlFoods = [];
    $.each( foods, function( key, val ) {
      htmlFoods.push( HTMLHelper.newTableEntry(val, table));
    });
    htmlFoods.forEach(function(food) {
      $(".food-table-body").append(food);
    });
  };

  static formFoodMealTable(foods) {
    var htmlFoods = [];
    $.each( foods, function( key, val ) {
      htmlFoods.push( HTMLHelper.newFoodMealTableEntry(val));
    });
    htmlFoods.forEach(function(food) {
      $(".food-meals-table-body").append(food);
    });
  };

  static refreshFoodTable(appendingTable) {
    let appendedTable = appendingTable
    $foodTable.children().remove();
    var formTable = this.formTable
    AjaxRequests.requestAllFood().then(function(data) {
      formTable(data, appendingTable)
    });
  };

  static populateTotalCaloriesTableValues(consumed, remaining) {
    $('.calories-consumed-val')[0].innerText = consumed;
    $('.total-remaining-calories-val')[0].innerText = remaining;
    if (remaining < 0) {
      $('.total-remaining-calories-val')[0].style.color = 'red';
    } else {
      $('.total-remaining-calories-val')[0].style.color = 'green';
    }
  }
};

module.exports = HTMLRunner
