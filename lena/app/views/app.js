Lena.views.App = Backbone.View.extend({
  initialize: function(options) {
    this.session = options.session;
    this.pages = options.pages;

    this.appViews = {
      page: new Lena.views.Page(options),
      folder: new Lena.views.Folder(options),
      login: new Lena.views.Login(options)
    };

    this.subviews = {
      toolbar: new Lena.views.Toolbar(options)
    };
    
    this.session.on('change:userCtx', this.render, this);
    this.pages.on('reset', this.render, this);
    this.pages.on('change:title change:subtitle change:folder', this.render, this);
  },

  setAppView: function(name) {
    this.subviews.app = this.appViews[name];
  }
});
