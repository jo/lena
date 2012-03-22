Lena.models.DesignDocument = Backbone.Model.extend({
  menu: function(current) {
    var view = this.get('menu');

    current || (current = []);
    view || (view = {});

    return _.map(view, function(entry) {
      return {
        url: '/' + Lena.helpers.url.folder(entry),
        title: entry,
        current: _.any(current, function(folder) { return Lena.helpers.url.match([[folder, entry]]); })
      };
    });
  }
});
