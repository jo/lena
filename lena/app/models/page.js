Lena.models.Page = Backbone.Model.extend({
  defaults: {
    type: 'page'
  },

  match: function(folder, page) {
    if (page) {
      return Lena.helpers.url.match([
        [folder, this.get('folder')],
        [page, this.get('title')]
      ]);
    }

    if (folder) {
      return Lena.helpers.url.match([
        [folder, this.get('folder')]
      ]);
    }

    return true;
  }
});
