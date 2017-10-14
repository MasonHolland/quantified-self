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
const FoodRunner = require ('./htmlRunner')
const MealEvents = require ('./meal-events')
const Meals = require("../models/meals")
var allFoods = null;

Food.requestAllFood().then(function(data) {
  allFoods = data.map(function( key, val ) {
    return new Food(key);
  }).sort(function(a, b) {
    return (b.id - a.id);
  });
  FoodRunner.formTable(allFoods)
});

$newFoodForm.hide();

$(document).on('click','.delete-food',function(){
  let id = $(this).attr("class").split(" ")[1];

  Meals.deleteAllFoods(id).then(function(){
    Food.deleteFood(id).then(function() {
      FoodRunner.refreshFoodTable()
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
  FoodRunner.formTable(filteredFoods);
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

// edit food
$(document).on('mouseout', '.edit-input', function(event) {
  var id = $(this).attr("class").split(" ")[1];
  var calories = event.target.parentElement.parentElement.innerText.split(/(\s+)/)[2];
  var name = this.value;
  $.ajax({
    method: "PATCH",
    url: (api + "/" + id),
    data: { food: { name: name, calories: calories}}
  }).then(function() {
    FoodRunner.refreshFoodTable();
  });
  event.preventDefault();
});
