Lena.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    ":folder": "folder",
    ":folder/:title": "page"
  },

  initialize: function(payload) {
    this.ddoc = new Lena.models.DesignDocument(payload.ddoc);
    this.session = new Lena.models.Session(payload.session);
  },

  // home page
  index: function() {
  },

  // show folder
  folder: function(folder) {
  },

  // show page
  page: function(folder, page) {
  }
})
