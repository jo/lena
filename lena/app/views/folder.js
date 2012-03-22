Lena.views.Folder = Backbone.View.extend({
  initialize: function(options) {
    this.pages = options.pages;

    this.contentViews = {
      show: new Lena.views.Show(options),
      list: new Lena.views.List(options)
    };

    this.subviews = {
      toolbar: new Lena.views.Toolbar(options)
    };
  },

  render: function() {
    this.subviews.content = this.contentViews[this.pages.single() ? 'show' : 'list'];

    return Backbone.View.prototype.render.call(this);
  }
});
