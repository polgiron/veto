App.App = function() {
  new App.Main();
  new App.Search();
  new App.Mobile();
  new App.Accordion();
};

var app = new App.App();
