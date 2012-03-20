Lena.views.List = Backbone.View.extend({
  template: 'list',

  events: {
    'click a': 'go'
  },
  
  initialize: function(options) {
    this.ddoc = options.ddoc;
    this.router = options.router;

    this.subviews = {
      menu: new Lena.views.Menu({
        model: this.ddoc,
        router: this.router
      })
    };
  },
  
  view: function() {
    return {
      title: this.ddoc.get('title'),
      docs: this.collection.toJSON()
    };
  },
  
  go: function(e) {
    this.router.navigate(e.target.getAttribute('href'), { trigger: true });

    return false;
  }
});
