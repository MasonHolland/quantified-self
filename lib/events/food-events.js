const $ = require('jquery');
const Food = require('../models/food');
const AjaxRequests = require('../helpers/ajaxHelper')
const HTMLHelper = require('../helpers/htmlHelper')
const $foodForm = $('.food-form');
const $newFood = $('#new-food');
const $foodSearch = $('#food-search');
const $newFoodName = $('.new-food-name');
const $newFoodCalories = $('.new-food-calories');
const apiUrl = require('../config/apiUrl');

// let allFoods = null;

// food retrieval and mapping
AjaxRequests.requestAllFood().then(function(data) {
  formTable(data)
  allFoods = data.map(function tableRowForm( key, val ) {
    return new Food(key);
  }).sort(function(a, b) {
    return (b.id - a.id);
  });
});

// delete food button
$(document).on('click','.delete-food',function(){
  let id = $(this).attr("class").split(" ")[1];
  AjaxRequests.deleteFood(id).then(function() {
    refreshTable();
  });
  event.preventDefault();
});

$foodForm.hide();

$('#new-food').on("click", function (event) {
  $foodForm.show();
  $newFood.hide();
});

$foodForm.on("submit", function (event) {
  var name = $(".new-food-name").val();
  var calories = $(".new-food-calories").val();
  AjaxRequests.createNewFood(name, calories)

  $foodForm.hide();
  $newFood.show();
  refreshTable();

  event.preventDefault();
});

$foodSearch.on('keyup', function(event) {
  var searchedFood = $foodSearch.val().toLowerCase();
  var filteredFoods = allFoods.filter(function(food){
    return food.name.toLowerCase().includes(searchedFood);
  }).sort((a,b) => {
    return b.id - a.id;
  });
  $('.table-body').children().remove();
  formTable(filteredFoods);
});

// $newFoodName.on('click', function(event) {
//   console.log(this);
//   if ($newFoodName.val() === '') {
//     $newFoodName.text('Error: Please enter a name');
//   return false;
//   } else {
//     return true;
//   }
// });

function refreshTable() {
  $('.table-body').children().remove();
  Food.requestAllFood().then(function(data) {
    formTable(data)
  });
};

function formTable(foods) {
  var htmlFoods = [];
  $.each( foods, function tableRowForm( key, val ) {
    htmlFoods.push( HTMLHelper.newTableEntry(val));
  });
  htmlFoods.forEach(function(food) {
    $(".table-body").append(food);
  });
};
