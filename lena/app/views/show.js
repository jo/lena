Lena.views.Show = Backbone.View.extend({
  template: 'show',

  initialize: function(options) {
    this.ddoc = options.ddoc;
    this.router = options.router;

    this.subviews = {
      menu: new Lena.views.Menu({
        model: this.ddoc,
        collection: this.collection,
        router: this.router
      })
    };
  },
  
  view: function() {
    return {
      title: this.ddoc.get('title'),
      docs: this.collection.toJSON()
    };
  }
});
