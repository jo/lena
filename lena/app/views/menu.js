Lena.views.Menu = Backbone.View.extend({
  template: 'menu',

  events: {
    'click a': 'go'
  },
  
  initialize: function(options) {
    this.ddoc = options.ddoc;
    this.router = options.router;
    this.pages = options.pages;
  },
  
  view: function() {
    return {
      menu: this.ddoc.menu(this.pages.folders())
    };
  },
  
  go: function(e) {
    this.router.navigate(e.target.getAttribute('href'), { trigger: true });

    return false;
  }
});
