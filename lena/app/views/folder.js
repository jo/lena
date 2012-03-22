Lena.views.Folder = Backbone.View.extend({
  initialize: function(options) {
    this.router = options.router;
    this.session = options.session;
    this.ddoc = options.ddoc;

    this.contentViews = {
      show: new Lena.views.Show({
        ddoc: this.ddoc,
        router: this.router,
        collection: this.collection
      }),
      list: new Lena.views.List({
        ddoc: this.ddoc,
        router: this.router,
        collection: this.collection
      })
    };

    this.subviews = {
      toolbar: new Lena.views.Toolbar({
        el: '#toolbar',
        model: this.session
      })
    };
  },

  render: function() {
    this.subviews.content = this.contentViews[this.collection.single() ? 'show' : 'list'];

    return Backbone.View.prototype.render.call(this);
  }
});
