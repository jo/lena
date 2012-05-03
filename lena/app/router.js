Lena.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    ";)": "login",
    ":folder": "list",
    ":folder/:title": "show"
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
    this.action = 'index';

    this.view.setAppView('page');
    this.pages.setScope();
  },

  // show folder
  list: function(folder) {
    this.action = 'list';

    this.view.setAppView('folder');
    this.pages.setScope(folder);
  },

  // show page
  show: function(folder, page) {
    this.action = 'show';

    this.view.setAppView('page');
    this.pages.setScope(folder, page);
  },

  // login
  login: function() {
    this.action = 'login';

    this.view.setAppView('login');
  }
})
