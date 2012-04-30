Lena.views.List = Backbone.View.extend({
  template: 'list',

  initialize: function(options) {
    this.ddoc = options.ddoc;
    this.router = options.router;
    this.pages = options.pages;

    this.subviews = {
      menu: new Lena.views.Menu(options)
    };
  },
  
  view: function() {
    // flag doublicates
    return {
      title: this.ddoc.get('title'),
      docs: _.map(_.groupBy(this.pages.toJSON(), function(page) { return page.title + page.subtitle; }), function(docs, key) {
        return {
          doc: docs.shift(),
          dublicates: docs
        };
      })
    };
  }
});
