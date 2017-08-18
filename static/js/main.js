// Constructor
App.Main = function() {
  this.init_();
};

// Init function
App.Main.prototype.init_ = function() {
  console.log('Init main constructor');

  // $('.image-list').masonry({
  //   itemSelector: '.image-list__entry',
  //   columnWidth: 200
  // });

  // var i = 0;

  $('.gallery-image').load(function() {
    // console.log('image loaded');

    $(this).addClass('is-loaded');

    // i++;
    // if (i == $('.gallery-image').length) {
    //   $('.gallery-image').addClass('is-loaded');
    // }
  });
};
