// Constructor
App.Mobile = function() {
  this.init_();
};

App.Mobile.prototype.init_ = function() {
  $('.mobile-menu-button').on('click', function(event) {
    $(this).toggleClass('is-active');
    $('.main-nav').toggleClass('is-active');
    $('body').toggleClass('menu-open');
  });

  $('#fiches-mobile-button, .fiche-nav__overlay, #close-fiche-menu').on('click', function(event) {
    $('.fiche-nav').toggleClass('is-active');
    $('.fiche-nav__overlay').toggleClass('is-active');
  });

  // $('.fiche-nav__overlay').on('click', function(event) {
  //   $('.fiche-nav').toggleClass('is-active');
  //   $('.fiche-nav__overlay').toggleClass('is-active');
  // });
};
