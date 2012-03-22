Lena.views.Page = Backbone.View.extend({
  name: 'page',

  initialize: function(options) {
    this.subviews = {
      toolbar: new Lena.views.Toolbar(options),
      content: new Lena.views.Show(options),
    };
    new Lena.views.Editor(options)
  }
});
