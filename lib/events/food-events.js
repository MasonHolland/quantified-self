const Food = require('../models/food');
const $foodForm = $('.food-form');
const $newFood = $('#new-food');
const $foodSearch = $('#food-search');
const api = ("https://fierce-savannah-17132.herokuapp.com/api/v1/foods");
var allFoods = null;
Food.requestAllFood()
  .then(function(data) {
    formTable(data)
    allFoods = data.map(function tableRowForm( key, val ) {
      return new Food(key);
    }).sort(function(a, b) {
      return (b.id - a.id);
    });
  });

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

  $foodForm.hide();

  $('#new-food').on("click", function (event) {
    $foodForm.show();
    $newFood.hide();
  });

  $foodForm.on("submit", function (event) {
    var name = $(".name").val();
    var calories = $(".calories").val();
    $.post( api, {food: {
      name: name,
      calories: calories
    }});

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

  function refreshTable() {
    $('.table-body').children().remove();
    Food.requestAllFood().then(function(data) {
      formTable(data)
    });
  };

  function formTable(foods) {
    var htmlFoods = [];

    $.each( foods, function tableRowForm( key, val ) {
      htmlFoods.push( "<tr class='table-row'><td id='tbl-name " + val['id'] + "'>" + val['name'] + "</td><td id='tbl-cal " + val['id'] + "'>" + val['calories'] + "</td><td><button type='button' class='delete-food " + val['id'] + "'>Delete</button></td></tr>" );
    });

    htmlFoods.forEach(function(food) {
      $(".table-body").append(food);
    });
  }
