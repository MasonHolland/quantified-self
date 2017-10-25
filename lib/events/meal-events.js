const $ = require('jquery');
const Meal = require('../models/meals');
const HTMLHelper = require('../helpers/htmlHelper')
const AjaxRequests = require('../helpers/ajaxHelper')
const HTMLRunner = require ('./htmlRunner')

var allMeals = null;
var mealLength = 0

Meal.requestAllMeals().then(function(data) {
  allMeals = data.map(function(key, val) {
    return new Meal(key)
  }).sort(function(a, b) {
    return (b.id - a.id);
  });
  mealLength = allMeals.length
  formTable(allMeals, "meal-table")
  formTableRows(allMeals)
  calculateCalories(allMeals)
  calculateTotalCalories()
});

$('.meal-selection .btn').on('click', function addFoodstoMeal(event) {
  const $mealTable = $("." + event.target.innerText + "-table");
  const mealID = $(this).attr("id");
  const mealName = this.innerText
  const foodJson = {}

  const foodIDs = $('.food-meal-table input:checkbox:checked').map( function(){
    foodJson['id'] = $(this).attr("id").split(" ")[1];
    foodJson['name'] = $(`.table-name.${foodJson['id']}`)[0].innerText;
    foodJson['calories'] = $(`.table-cal.${foodJson['id']}`)[0].innerText;
    $("." + event.target.textContent + "-tbody").append(HTMLHelper.newTableEntry(foodJson, "meal-table", mealName.toLowerCase()))
    return $(this).attr("id").split(" ")[1];
  });

  for(let i = 0; i < foodIDs.length; i++) {
    Meal.addMealFood(mealID, foodIDs[i])
    event.preventDefault();
  }
  refreshCalories(mealName);
});

$(document).on('click','.delete-food-meal-table',function(){
  let foodID = $(this).attr("class").split(" ")[1];
  debugger;
  let mealID = event.path[3].className.split(' ')[1]
  let mealName = event.path[3].className.split(' ')[0].split("-")[0]
  let parentElement = event.path[2].remove();

  Meal.deleteFood(mealID, foodID).then(function(data){
    refreshCalories(mealName);
  });
  event.preventDefault();
});

$('.meal-selection').click(function() {
  $('.add-to-meal-checkbox').prop('checked', false);
})

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
      HTMLHelper.newTableEntry(value, "meal-table", val.name.toLowerCase())
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
  $.each ( meals, function ( key, val ) {
    this.calories = 0;
    this.html = "";
    this.remainingCalories = Meal.checkRemainingCalories(this.name);
    var currentMeal = this;
    $.each(val.foods, function( key, value ) {
      currentMeal.calories += value.calories;
      currentMeal.remainingCalories -= value.calories;
    });
    currentMeal.html = HTMLHelper.totalMealCalories(currentMeal)
  })
  allMeals.forEach(function(meal) {
      $('.' + meal.name + '-tfoot').append(meal.html);
      Meal.remainingCaloriesColorChecker(meal.remainingCalories, meal.name)
  })
}

function refreshCalories(meal) {
  if (meal == '1' || meal == 'Breakfast') {
    var mealName = 'Breakfast'
    calculateNewTotalCalories(mealName)
    calculateNewRemainingCalories(mealName)
  } else if (meal === '2' || meal == 'Snack') {
    var mealName = 'Snack'
    calculateNewTotalCalories(mealName)
    calculateNewRemainingCalories(mealName)
  } else if (meal == '3' || meal == 'Lunch') {
    var mealName = 'Lunch'
    calculateNewTotalCalories(mealName)
    calculateNewRemainingCalories(mealName)
  } else if (meal == '4' || meal == 'Dinner') {
    var mealName = 'Dinner'
    calculateNewTotalCalories(mealName)
    calculateNewRemainingCalories(mealName)
  }
  calculateTotalCalories();
}

function calculateNewTotalCalories(table) {
  var total = 0;
  var tableName = table.toLowerCase();
  var all = $(`.${tableName}-calories`).map(function() {
    total += parseInt(this.innerText);
  });
  $(`.${table}-calories`)[0].innerText = total;
}

function calculateNewRemainingCalories(table) {
  var remaining = Meal.checkRemainingCalories(table);
  var total = $(`.${table}-calories`)[0].innerText;
  var newRemaining = remaining - total;
  $(`.${table}-remaining-calories`)[0].innerText = newRemaining;
  Meal.remainingCaloriesColorChecker(newRemaining, table);
}

function calculateTotalCalories() {
  var consumed  = Meal.calculateTotalConsumedCalories();
  var remaining = 2000 - consumed;
  HTMLRunner.populateTotalCaloriesTableValues(consumed, remaining);
}
