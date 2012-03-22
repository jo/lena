Lena.views.Toolbar = Backbone.View.extend({
  template: 'toolbar',

  events: {
    'click [data-action=logout]': 'logout'
  },
  
  initialize: function(options) {
    this.session = options.session;
  },
  
  view: function() {
    return {
      username: this.session.username()
    };
  },
  
  logout: function() {
    this.session.logout();
    this.render();
  }
});
