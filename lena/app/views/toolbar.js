Lena.views.Toolbar = Backbone.View.extend({
  template: 'toolbar',

  events: {
    'click [data-action=logout]': 'logout'
  },
  
  view: function() {
    return {
      username: this.model.username()
    };
  },
  
  logout: function() {
    this.model.logout();
    this.render();
  }
});
