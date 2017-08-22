// Constructor
App.Main = function() {
  this.animationOffset_ = window.innerHeight / 3;
  this.scrollPosition_ = 0;
  this.sectionToAnimate_ = [];
  this.animateElement_ = $('.animate-section');

  this.init_();
};

App.Main.prototype.init_ = function() {
  this.updateSectionToAnimate_();
  this.animateSection_();
  this.addEventListenners_();
};

App.Main.prototype.addEventListenners_ = function() {
  $(window).on('scroll', function(event) {
    this.scrollPosition_ = $(document).scrollTop();
    this.animateSection_();
  }.bind(this));

  $(window).on('resize', function(event) {
    this.updateSectionToAnimate_();
  }.bind(this));

  $('.hero__scroll-first').on('click', function(event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $('#first-section').offset().top - $('.header').height()
    }, 600, 'swing');
  });

  $('.hero__scroll-last').on('click', function(event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $('#last-section').offset().top - $('.header').height()
    }, 1000, 'swing');
  });
};

App.Main.prototype.updateSectionToAnimate_ = function() {
  this.animateElement_.each(function(index, el) {
    this.sectionToAnimate_.push({
      el: el,
      offset: $(el).offset().top
    });
  }.bind(this));
};

App.Main.prototype.animateSection_ = function() {
  $.each(this.sectionToAnimate_, function(index, entry) {
    if (this.scrollPosition_ + window.innerHeight >=
        entry.offset + this.animationOffset_ ||
            (window.innerHeight + this.scrollPosition_) >=
                document.body.scrollHeight) {
      $(entry.el).addClass('is-animated');
    }
  }.bind(this));
};
