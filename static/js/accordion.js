App.Accordion = function() {
  var activeTab = 0;

  $('.accordion ul').each(function(i, el) {
    if ($(el).find('.is-active').length) {
      activeTab = i;
    }
  });

  $('.accordion').accordion({
    active: activeTab,
    heightStyle: 'content',
    collapsible: true
  });
};
