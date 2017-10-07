$(document).ready(formTables);
$('.food-table').on("load", formTables);


function formTables() {
  var api = "https://fierce-savannah-17132.herokuapp.com/api/v1/foods"

  $.getJSON(api, function jsonRetreive(data) {
    var foods = []

    $.each( data, function tableRowForm( key, val ) {
      foods.push( "<tr class='table-row'><td id='tbl-name " + val['id'] + "'>" + val['name'] + "</td><td id='tbl-cal " + val['id'] + "'>" + val['calories'] + "</td><td><button type='button' class='delete-food " + val['id'] + "'>Delete</button></td></tr>" );
    });

    foods.forEach(function(food) {
      $(".table-body").append(food);
    });
  });
};
