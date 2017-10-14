const $ = require('jquery');
const Meal = require('../models/meals');
const HTMLHelper = require('../helpers/htmlHelper')

var allMeals = null;
var mealLength = 0

Meal.requestAllMeals().then(function(data) {
  allMeals = data.map(function(key, val) {
    return new Meal(key)
  }).sort(function(a, b) {
    return (b.id - a.id);
  });
  mealLength = allMeals.length
  formTable(allMeals)
  formTableRows(allMeals)
});

function formTable(meals) {
  var htmlMeals = [];
  $.each( allMeals, function( key, val ) {
    htmlMeals.push(
      HTMLHelper.newTableDiv(val)
    );
  });
  htmlMeals.forEach(function(food) {
    $(".meal-tables").append(food);
  });
};

function formTableRows(meals) {
  var htmlMeals = {}
  $.each( allMeals, function( key, val ) {
    htmlMeals[val.name] = [];
    $.each(val.foods, function(keys, value) {
      htmlMeals[val.name].push(
      HTMLHelper.newTableEntry(value)
      )
    });
  });
  for (var item in htmlMeals) {
    htmlMeals[item].forEach(function(food) {
      $("." + this.concat() + "-tbody").append(food);
    }, item)
  }
}

function calculateCalories() {}
