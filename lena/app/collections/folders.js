Lena.collections.Folders = Backbone.Collection.extend({
  model: Lena.models.Page,

  urlRoot: '/api/folders',

  url: function() {
    return this.urlRoot + '/' + encodeURIComponent(this.folder)
  },

  initialize: function(models, options) {
    this.folder = options.folder;
  }
});
