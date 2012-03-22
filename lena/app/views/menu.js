Lena.views.Menu = Backbone.View.extend({
  template: 'menu',

  events: {
    'click a': 'go'
  },
  
  initialize: function(options) {
    this.router = options.router;

    this.collection.on('reset', this.render, this);
  },
  
  view: function() {
    return {
      menu: this.model.menu(_.uniq(this.collection.pluck('folder')))
    };
  },
  
  go: function(e) {
    this.router.navigate(e.target.getAttribute('href'), { trigger: true });

    return false;
  }
});
