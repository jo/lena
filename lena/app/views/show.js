Lena.views.Show = Backbone.View.extend({
  template: 'show',

  initialize: function(options) {
    this.session = options.session;
    this.ddoc = options.ddoc;
    this.pages = options.pages;

    this.subviews = {
      menu: new Lena.views.Menu(options),
      imagemap: new Lena.views.Imagemap(options)
    };
  },
  
  view: function() {
    return {
      title: this.ddoc.get('title'),
      editable: this.session.canWrite(),
      docs: this.pages.toJSON()
    };
  }
});
