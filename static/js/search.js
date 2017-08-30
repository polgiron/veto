App.Search = function() {
  $('#search-input').on('keyup', function(event) {
    var val = $(this).val().toLowerCase();

    $('.fiche-nav__entry').each(function(index, el) {
      if ($(el).text().toLowerCase().indexOf(val) == -1) {
        $(el).hide();
      } else {
        $(el).show();
      }
    });
  });
};
