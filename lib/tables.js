$(document).ready(function () {
  var api = "https://fierce-savannah-17132.herokuapp.com/api/v1/foods"

  $.getJSON(api, function(data) {
    var foods = []

    $.each( data, function( key, val ) {
      foods.push( "<tr><td id='tbl-name " + key + "'>" + val['name'] + "</td><td id='tbl-cal " + key + "'>" + val['calories'] + "</td></tr>" );
    });

    foods.forEach(function(food) {
      $(".table-body").append(food)
    });
  });

});
