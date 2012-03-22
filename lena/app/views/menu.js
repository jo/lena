Lena.views.Menu = Backbone.View.extend({
  template: 'menu',

  events: {
    'click a': 'go'
  },
  
  initialize: function(options) {
    this.router = options.router;
  },
  
  view: function() {
    return {
      menu: this.model.menu(this.collection.folders())
    };
  },
  
  go: function(e) {
    this.router.navigate(e.target.getAttribute('href'), { trigger: true });

    return false;
  }
});
