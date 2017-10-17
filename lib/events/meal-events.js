const $ = require('jquery');
const Meal = require('../models/meals');
const HTMLHelper = require('../helpers/htmlHelper')
const AjaxRequests = require('../helpers/ajaxHelper')

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
  calculateCalories(allMeals)
});

$('.meal-selection .btn').on('click', function addFoodstoMeal(event) {
  const $mealTable = $("." + event.target.innerText + "-table");
  const mealID = $(this).attr("id");
  const mealName = $(this).innerText
  const foodJson = {}

  const foodIDs = $('.food-meal-table input:checkbox:checked').map( function(){
    foodJson['id'] = $(this).attr("id").split(" ")[1];
    foodJson['name'] = $(`.table-name.${foodJson['id']}`)[0].innerText;
    foodJson['calories'] = $(`.table-cal.${foodJson['id']}`)[0].innerText;
    $("." + event.target.textContent + "-tbody").append(HTMLHelper.newTableEntry(foodJson))
    return $(this).attr("id").split(" ")[1];
  });

  for(let i = 0; i < foodIDs.length; i++) {
    Meal.addMealFood(mealID, foodIDs[i])
    event.preventDefault();
  }
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

function calculateCalories(meals) {
  var htmlMeals = {}
  $.each ( allMeals, function ( key, val ) {
    htmlMeals[val.name] = { totalCalories: [] };
    $.each(val.foods, function( key, val ) {
      htmlMeals[val.name].totalCalories.push(val.calories)
    });
    htmlMeals[val.name].totalCalories.reduce((total, amount) => total + amount);
    htmlMeals[val.name].push(
      HTMLHelper.totalMealCalories(htmlMeals[val.name].totalCalories)
    )
  })
}
