Lena.views.App = Backbone.View.extend({
  initialize: function(options) {
    this.router = options.router;
    this.session = options.session;
    this.ddoc = options.ddoc;

    this.appViews = {
      page: new Lena.views.Page(options),
      folder: new Lena.views.Folder(options),
      login: new Lena.views.Login({
        router: this,
        model: this.session
      })
    };

    this.subviews = {};
    
    this.session.on('change:userCtx', this.render, this);
    this.collection.on('reset', this.render, this);
  },

  setAppView: function(name) {
    this.subviews.app = this.appViews[name];
  }
});
