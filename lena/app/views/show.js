Lena.views.Show = Backbone.View.extend({
  template: 'show',

  initialize: function(options) {
    this.session = options.session;
    this.ddoc = options.ddoc;
    this.pages = options.pages;

    this.subviews = {
      menu: new Lena.views.Menu(options)
    };
  },
  
  view: function() {
    return {
      title: this.ddoc.get('title'),
      editable: this.session.isAdmin(),
      docs: this.pages.toJSON()
    };
  }
});
