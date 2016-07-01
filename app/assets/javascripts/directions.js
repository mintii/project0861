$(document).ready(function() {
  $(document).on("click", "#direction_template", function(){
    $("#direction_template").hide();
  });

 $('#hint_button').on('click', function(){
    $("#direction_template").toggle();
  });


});
