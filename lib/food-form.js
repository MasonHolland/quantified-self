$(document).ready(function() {
  var $foodForm = $('.food-form')

  $foodForm.hide();

  $('#new-food').on("click", function (event) {
    $foodForm.show();
  });

  $foodForm.on("submit", function (event) {
    var api = "https://fierce-savannah-17132.herokuapp.com/api/v1/foods"
    var name = $(".name").val();
    var calories = $(".calories").val();
    $.post( api, {food: {
      name: name,
      calories: calories
    }});
    $foodForm.hide();
    $('.table-body').load();

    event.preventDefault();
  })
});
