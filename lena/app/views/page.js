Lena.views.Page = Backbone.View.extend({
  name: 'page',

  initialize: function(options) {
    this.router = options.router;
    this.session = options.session;
    this.ddoc = options.ddoc;

    this.subviews = {
      toolbar: new Lena.views.Toolbar({
        model: this.session
      }),
      content: new Lena.views.Show({
        ddoc: this.ddoc,
        router: this.router,
        collection: this.collection
      })
    };
    
    this.session.on('change:userCtx', this.render, this);
    this.collection.on('reset', this.render, this);
  }
});
