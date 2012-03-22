Lena.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    ";)": "login",
    ":folder": "folder",
    ":folder/:title": "page"
  },

  initialize: function(payload) {
    this.ddoc = new Lena.models.DesignDocument(payload.ddoc);
    this.session = new Lena.models.Session(payload.session);
    this.pages = new Lena.collections.Pages();

    this.view = new Lena.views.App({
      el: document.body,
      router: this,
      session: this.session,
      ddoc: this.ddoc,
      pages: this.pages
    });

    this.pages.fetch();
  },

  // home page
  index: function() {
    this.view.setAppView('page');
    this.pages.setScope();
  },

  // show folder
  folder: function(folder) {
    this.view.setAppView('folder');
    this.pages.setScope(folder);
  },

  // show page
  page: function(folder, page) {
    this.view.setAppView('page');
    this.pages.setScope(folder, page);
  },

  // login
  login: function() {
    this.view.setAppView('login');
  }
})
