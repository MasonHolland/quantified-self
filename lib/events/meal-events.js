const $ = require('jquery');
const Meal = require('../models/meals')

var allMeals = null;

Meal.requestAllMeals()
  .then(function(data) {
    allMeals = data.map(function(key, val) {
      return new Meal(key)
    }).sort(function(a, b) {
      return (b.id - a.id);
    });
  formTable(allMeals)
  formTableRows(allMeals)
  });

  function formTable(meals) {
    var htmlMeals = [];
    $.each( meals, function( key, val ) {
      htmlMeals.push(
        ""
      );
    });
    htmlMeals.forEach(function(food) {
      $(".meal-tables").append(food);
    });
  };

  function formTableRows(meals) {
    htmlMeals = [];
    $.each( meals, function( key, val ) {
      $.each(val.foods, function() {
        htmlMeals.push(
        "<tr class='table-row'><td class='meal-table-name " + val['id'] + "'>" + val['name'] + "</td><td class='meal-table-cal " + val['id'] + "'>" + val['calories'] + "</td><td><button type='button' class='delete-food " + val['id'] + "'>Delete</button></td></tr>"
        )
      });
    });
    htmlMeals.forEach(function(food) {
      $(".meal-table-body").append(food);
    });
  }
