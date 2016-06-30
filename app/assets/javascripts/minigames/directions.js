$(document).ready(function() {
  $("#direction_template").on("click", function(){
    $(this).hide();
  });

  var hints = $('#direction_template');
  hints.on('click', function(){
    hints.toggle();
  });
});
