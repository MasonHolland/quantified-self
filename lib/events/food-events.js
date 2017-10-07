const Food = require('../models/food');
const $foodForm = $('.food-form');
const $newFood = $('#new-food');
const api = ("https://fierce-savannah-17132.herokuapp.com/api/v1/foods");
const allFoods = Food.requestAllFood()
  .then(function(data) {
    formTable(data)
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
  })

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

    $.map( foods, function tableRowForm( key, val ) {
      return new Food(val);
    }).sort(function(a, b) {
      return (b.id - a.id);
    });
  }
