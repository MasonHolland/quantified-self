const $ = require('jquery');
const Food = require('../models/food');
const $newFoodForm = $('.food-form');
const $foodTable  = $('.food-table-body');
const ajaxRequests = require('../helpers/ajaxHelper')
const HTMLHelper = require('../helpers/htmlHelper')
const $newFood = $('#new-food');
const $foodSearch = $('#food-search');
const $newFoodName = $('.new-food-name');
const $newFoodCalories = $('.new-food-calories');
const apiUrl = require('../config/apiUrl');
const FoodRunner = require ('./htmlRunner')
const MealEvents = require ('./meal-events')
const Meals = require("../models/meals")

var allFoods;
var counter = 2;

Food.requestAllFood().then(function(data) {
  allFoods = data.map(function( key, val ) {
    return new Food(key);
  }).sort(function(a, b) {
    return (b.id - a.id);
  });
  HTMLRunner.formTable(allFoods, "food-table");
  HTMLRunner.formFoodMealTable(allFoods);
});

$newFoodForm.hide();

$(document).on('click','.delete-food-food-table',function(){
  let id = $(this).attr("class").split(" ")[1];

  Meals.deleteAllFoods(id).then(function(){
    AjaxRequests.deleteFood(id).then(function(data) {
      HTMLRunner.refreshFoodTable("food-table")
    });
  });

  event.preventDefault();
});


$newFood.on("click", function (event) {
  $newFoodForm.show();
  $newFood.hide();
});

$newFoodForm.on("submit", function (event) {
  var name = $(".new-food-name").val();
  var calories = $(".new-food-calories").val();
  $newFoodForm.hide();
  $newFood.show();
  Food.addFood(name, calories)
    .then(function(data) {
      FoodRunner.refreshFoodTable()
    });
  event.preventDefault();
});

$foodSearch.on('keyup', function(event) {
  var searchedFood = $foodSearch.val().toLowerCase();
  var filteredFoods = allFoods.filter(function(food){
    return food.name.toLowerCase().includes(searchedFood);
  }).sort((a,b) => {
    return b.id - a.id;
  });
  $foodTable.children().remove();
  HTMLRunner.formTable(filteredFoods, "food-table");
});

$foodTable.on('click', '.table-name', function(event) {
  var id = $(this).attr("class").split(" ")[1];
  event.target.outerHTML = `<td><input type="text" class="edit-input ${id}"` + ` data-id=${id} value="${event.target.innerText}"></td>`;
  event.preventDefault();
});

$foodTable.on('click', '.table-cal', function(event) {
  var id = $(this).attr("class").split(" ")[1];
  event.target.outerHTML = `<td><input type="text" class="edit-input ${id}"` + ` data-id=${id} value="${event.target.innerText}"></td>`;
  event.preventDefault();
});

// sort food
$('.food-page-calorie-header').on('click', function() {
  $('.food-table-body').empty();
  debugger;
  if ((counter % 2) === 0) {
    var allFoods = calorieSort();
  } else if ((counter % 3) === 0) {
    var allFoods = reverseCalorieSort();
  } else {
    var allFoods = idSort();
  }
  counter++;
  HTMLRunner.formTable(allFoods, "food-table");
})

// edit food
$(document).on('mouseout', '.edit-input-name', function(event) {
  var id = $(this).attr("class").split(" ")[1];
  var calories = event.target.parentElement.parentElement.innerText.split(/(\s+)/)[2];
  var name = this.value;
  AjaxRequests.updateFood(name, calories, id).then(function(data) {
    HTMLRunner.refreshFoodTable('food-table');
  })
  .catch(function(error) {
    alert(error);
  });
  event.preventDefault();
});

$(document).on('mouseout', '.edit-input-cal', function(event) {
  var id = $(this).attr("class").split(" ")[1];
  var name = $(`.table-name.${id}`).text();
  var calories = this.value;
  AjaxRequests.updateFood(name, calories, id).then(function(data) {
    HTMLRunner.refreshFoodTable('food-table');
  })
  .catch(function(error) {
    alert(error);
  });
  event.preventDefault();
});


function idSort() {
  Food.requestAllFood().then(function(data) {
    allFoods = data.map(function( key, val ) {
      return new Food(key);
    }).sort(function(a, b) {
      return (b.id - a.id);
    });
  });
  return allFoods
};

function calorieSort() {
  Food.requestAllFood().then(function(data) {
    allFoods = data.map(function( key, val ) {
      return new Food(key);
    }).sort(function(a, b) {
      return (b.calories - a.calories);
    });
  });
  return allFoods
};

function reverseCalorieSort() {
  Food.requestAllFood().then(function(data) {
    allFoods = data.map(function( key, val ) {
      return new Food(key);
    }).sort(function(a, b) {
      return (a.calories - b.calories);
    });
  });
  return allFoods
};
