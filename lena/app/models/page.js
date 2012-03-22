Lena.models.Page = Backbone.Model.extend({
  defaults: {
    type: 'page'
  },

  match: function(folder, page) {
    if (page) {
      return Lena.helpers.url.match([
        [folder, this.get('folder')],
        [page, this.id]
      ]);
    }

    if (folder) {
      return Lena.helpers.url.match([
        [folder, this.get('folder')]
      ]);
    }

    return true;
  },

  images: function() {
    var attachments = this.get('_attachments'),
        doc = this.toJSON();

    return _.map(attachments, function(attachment, name) {
      return {
        name: name,
        url: Lena.helpers.url.image(doc, name)
      };
    });
  }
});
