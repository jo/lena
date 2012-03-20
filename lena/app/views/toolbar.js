Lena.views.Toolbar = Backbone.View.extend({
  template: 'toolbar',

  events: {
    'click [data-action=logout]': 'logout'
  },
  
  initialize: function(options) {
    // this.model.on('change:userCtx', this.render, this);
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
