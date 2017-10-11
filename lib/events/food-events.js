const $ = require('jquery');
const Food = require('../models/food');
const $newFoodForm = $('.food-form');
const ajaxRequests = require('../helpers/ajaxHelper')
const HTMLHelper = require('../helpers/htmlHelper')
const $newFood = $('#new-food');
const $foodSearch = $('#food-search');
const $newFoodName = $('.new-food-name');
const $newFoodCalories = $('.new-food-calories');
const apiUrl = require('../config/apiUrl');
const $foodTable = $('.food-table');

var allFoods = null;

ajaxRequests.requestAllFood().then(function(data) {
  formTable(data)
  allFoods = data.map(function( key, val ) {
    return new Food(key);
  }).sort(function(a, b) {
    return (b.id - a.id);
  });
});

  $newFoodForm.hide();

  $(document).on('click','.delete-food',function(){
    var id = $(this).attr("class").split(" ")[1];
    $.ajax({
      method: "DELETE",
      url: (api + "/" + id)
    }).then(function() {
      refreshTable();
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
    $.post( api, { food: {
      name: name,
      calories: calories
    }});

    $newFoodForm.hide();
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

  $foodTable.on('click', '.table-name', function(event) {
    debugger;
    var id = $(this).attr("class").split(" ")[1];
    event.target.outerHTML = `<td><input type="text" class="edit-input ${id}"` + ` data-id=${id} value="${event.target.innerText}"></td>`;
    event.preventDefault();
  });

  $foodTable.on('click', '.table-cal', function(event) {
    var id = $(this).attr("class").split(" ")[1];
    event.target.outerHTML = `<td><input type="text" class="edit-input ${id}"` + ` data-id=${id} value="${event.target.innerText}"></td>`;
    event.preventDefault();
  });

  $(document).on('mouseout', '.edit-input', function(event) {
    var id = $(this).attr("class").split(" ")[1];
    var calories = event.target.parentElement.parentElement.innerText.split(/(\s+)/)[2];
    var name = this.value;
    $.ajax({
      method: "PATCH",
      url: (api + "/" + id),
      data: { food: { name: name, calories: calories}}
    }).then(function() {
      refreshTable();
    });
    event.preventDefault();
  })

  // var calories = $(".tbl-cal").val();

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
  $.each( foods, function( key, val ) {
    htmlFoods.push( HTMLHelper.newTableEntry(val));
  });
  debugger;
  htmlFoods.forEach(function(food) {
    $(".food-table-body").append(food);
  });
};
