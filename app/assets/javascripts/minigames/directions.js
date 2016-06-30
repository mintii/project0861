$(document).ready(function() {
  $(document).on("click", "#direction_template", function(){
    $("#direction_template").hide();
  });

  var hints = $('#direction_template');
  hints.on('click', function(){
    hints.toggle();
  });
});
