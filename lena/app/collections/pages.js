Lena.collections.Pages = Backbone.Collection.extend({
  model: Lena.models.Page,

  urlRoot: '/api/pages',

  url: function() {
    return this.urlRoot + '/' + encodeURIComponent(this.folder) + '/' + encodeURIComponent(this.page)
  },

  initialize: function(models, options) {
    this.folder = options.folder;
    this.page = options.page;
  }
});
