Lena.views.List = Backbone.View.extend({
  template: 'list',

  events: {
    'click a': 'go'
  },
  
  initialize: function(options) {
    this.ddoc = options.ddoc;
    this.router = options.router;
    this.pages = options.pages;

    this.subviews = {
      menu: new Lena.views.Menu(options)
    };
  },
  
  view: function() {
    return {
      title: this.ddoc.get('title'),
      docs: this.pages.toJSON()
    };
  },
  
  go: function(e) {
    this.router.navigate(e.target.getAttribute('href'), { trigger: true });

    return false;
  }
});
