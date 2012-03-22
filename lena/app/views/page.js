Lena.views.Page = Backbone.View.extend({
  name: 'page',

  initialize: function(options) {
    this.subviews = {
      content: new Lena.views.Show(options)
    };

    new Lena.views.Editor(options)
    new Lena.views.Drop(options)
  }
});
