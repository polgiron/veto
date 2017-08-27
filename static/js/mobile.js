// Constructor
App.Mobile = function() {
  this.init_();
};

App.Mobile.prototype.init_ = function() {
  $('.mobile-menu-button').on('click', function(event) {
    $(this).toggleClass('is-active');
    $('.main-nav').toggleClass('is-active');
  });
};
