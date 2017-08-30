App.App = function() {
  new App.Main();
  new App.Search();
  new App.Mobile();
};

var app = new App.App();
