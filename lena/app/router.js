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
      router: this,
      session: this.session,
      ddoc: this.ddoc,
      collection: new Lena.collections.Random()
    });
    this.view.collection.fetch();
  },

  // show folder
  folder: function(folder) {
    this.view =new Lena.views.Folder({
      el: '#app',
      router: this,
      session: this.session,
      ddoc: this.ddoc,
      collection: new Lena.collections.Folders([], {
        folder: folder
      })
    });
    this.view.collection.fetch();
  },

  // show page
  page: function(folder, page) {
    this.view =new Lena.views.Page({
      el: '#app',
      router: this,
      session: this.session,
      ddoc: this.ddoc,
      collection: new Lena.collections.Pages([], {
        folder: folder,
        page: page
      })
    });
    this.view.collection.fetch();
  },

  // login
  login: function() {
    this.view =new Lena.views.Login({
      el: '#app',
      router: this,
      model: this.session
    });
  }
})
