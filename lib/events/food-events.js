const $ = require('jquery');
const Food = require('../models/food');
const $newFoodForm = $('.food-form');
const $newFood = $('#new-food');
const $foodSearch = $('#food-search');
const $newFoodName = $('.new-food-name');
const $newFoodCalories = $('.new-food-calories');
const $foodTable = $('.food-table');
const api = ("https://fierce-savannah-17132.herokuapp.com/api/v1/foods");

var allFoods = null;

Food.requestAllFood()
  .then(function(data) {
    allFoods = data.map(function tableRowForm( key, val ) {
      return new Food(key);
    }).sort(function(a, b) {
      return (b.id - a.id);
    });
    formTable(allFoods)
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
    $.each( foods, function tableRowForm( key, val ) {
      htmlFoods.push( `
        <tr class="table-row">
          <td class='table-name " + val['id'] + "'>
            " + val['name'] + "
          </td>
          <td class='table-cal " + val['id'] + "'>
            " + val['calories'] + "
          </td>
          <td>
            <button type='button' class='delete-food " + val['id'] + "'>
              Delete
            </button>
          </td>
        </tr>
        `
      );
    });
    htmlFoods.forEach(function(food) {
      $(".food-table-body").append(food);
    });
  };
