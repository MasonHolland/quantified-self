const $ = require('jquery');
const Food = require('../models/food');
const AjaxRequests = require('../helpers/ajaxHelper')
const $newFoodForm = $('.food-form');
const $foodTable  = $('.food-table-body');
const HTMLHelper = require('../helpers/htmlHelper')
const $newFood = $('#new-food');
const $foodSearch = $('#food-search');
const $newFoodName = $('.new-food-name');
const $newFoodCalories = $('.new-food-calories');
const apiUrl = require('../config/apiUrl');
const HTMLRunner = require ('./htmlRunner')
const MealEvents = require ('./meal-events')
const Meals = require("../models/meals")
var allFoods;

Food.requestAllFood().then(function(data) {
  allFoods = data.map(function( key, val ) {
    return new Food(key);
  }).sort(function(a, b) {
    return (b.id - a.id);
  });
  HTMLRunner.formTable(allFoods);
  HTMLRunner.formFoodMealTable(allFoods);
});
$newFoodForm.hide();

$(document).on('click','.delete-food',function(){
  let id = $(this).attr("class").split(" ")[1];

  Meals.deleteAllFoods(id).then(function(){
    AjaxRequests.deleteFood(id).then(function(data) {
      HTMLRunner.refreshFoodTable()
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
  if (name.length == 0 || calories.length == 0) {
    alert('Please ensure both fields have been filled out')
  } else {
    $newFoodForm.hide();
    $newFood.show();
    Food.addFood(name, calories)
      .then(function(data) {
        HTMLRunner.refreshFoodTable()
      });
    $newFoodForm.reset();
    event.preventDefault();
  }
});

$foodSearch.on('keyup', function(event) {
  var searchedFood = $foodSearch.val().toLowerCase();
  var filteredFoods = allFoods.filter(function(food){
    return food.name.toLowerCase().includes(searchedFood);
  }).sort((a,b) => {
    return b.id - a.id;
  });
  $foodTable.children().remove();
  HTMLRunner.formTable(filteredFoods);
});

$foodTable.on('click', '.table-name', function(event) {
  var id = $(this).attr("class").split(" ")[1];
  event.target.outerHTML = `<td><input type="text" class="edit-input-name ${id}"` + ` data-id=${id} value="${event.target.innerText}"></td>`;
  event.preventDefault();
});

$foodTable.on('click', '.table-cal', function(event) {
  var id = $(this).attr("class").split(" ")[1];
  event.target.outerHTML = `<td><input type="text" class="edit-input-cal ${id}"` + ` data-id=${id} value="${event.target.innerText}"></td>`;
  event.preventDefault();
});

// edit food
$(document).on('mouseout', '.edit-input-name', function(event) {
  var id = $(this).attr("class").split(" ")[1];
  var calories = event.target.parentElement.parentElement.innerText.split(/(\s+)/)[2];
  var name = this.value;
  AjaxRequests.updateFood(name, calories, id).then(function(data) {
    HTMLRunner.refreshFoodTable();
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
    HTMLRunner.refreshFoodTable();
  })
  .catch(function(error) {
    alert(error);
  });
  event.preventDefault();
});
