Lena.views.Toolbar = Backbone.View.extend({
  template: 'toolbar',

  events: {
    'click [data-action=logout]': 'logout',
    'click [data-command]': 'format'
  },
  
  initialize: function(options) {
    this.session = options.session;
    this.pages = options.pages;
  },
  
  view: function() {
    return {
      username: this.session.username(),
      editing: this.pages.single(),
      images: this.pages.images()
    };
  },
  
  format: _.debounce(function(e) {
    var button = $(e.target);

    document.execCommand(button.data('command'), false, button.data('value'));

    return false;
  }, 100),
  
  logout: function() {
    this.session.logout();
    this.render();
  }
});
