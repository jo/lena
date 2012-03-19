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
  },

  // home page
  index: function() {
    this.view =new Lena.views.Page({
      el: '#app',
      model: this.session,
      router: this
    });
  },

  // login
  login: function() {
    this.view =new Lena.views.Login({
      el: '#app',
      model: this.session,
      router: this
    });
  },

  // show folder
  folder: function(folder) {
    this.view =new Lena.views.Folder({
      el: '#app',
      model: this.session,
      router: this
    });
  },

  // show page
  page: function(folder, page) {
    this.view =new Lena.views.Page({
      el: '#app',
      model: this.session,
      router: this
    });
  }
})
