Lena.models.DesignDocument = Backbone.Model.extend({
  menu: function(current) {
    var view = this.get('menu');

    current || (current = []);
    view || (view = {});

    return _.map(view, function(entry) {
      return {
        url: '/' + encodeURIComponent(entry),
        title: entry,
        current: current.indexOf(entry) > -1
      };
    });
  }
});
