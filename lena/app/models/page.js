Lena.models.Page = Backbone.Model.extend({
  defaults: {
    type: 'page'
  },

  match: function(folder, page) {
    if (page) {
      return folder === this.get('folder') && page === this.get('title');
    }

    if (folder) {
      return folder === this.get('folder');
    }

    return true;
  }
});
