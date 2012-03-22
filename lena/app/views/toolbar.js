Lena.views.Toolbar = Backbone.View.extend({
  template: 'toolbar',

  events: {
    'click [data-action=logout]': 'logout',
    'click button': 'format'
  },
  
  initialize: function(options) {
    this.session = options.session;
  },
  
  view: function() {
    return {
      username: this.session.username()
    };
  },
  
  format: function(e) {
    var button = $(e.target);

    document.execCommand(button.data('command'), false, button.data('value'));
  },
  
  logout: function() {
    this.session.logout();
    this.render();
  }
});
