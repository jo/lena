Lena.views.App = Backbone.View.extend({
  events: {
    'click [href^=/]': 'go'
  },
  
  initialize: function(options) {
    this.session = options.session;
    this.pages = options.pages;
    this.ddoc = options.ddoc;
    this.router = options.router;

    this.appViews = {
      page: new Lena.views.Page(options),
      folder: new Lena.views.Folder(options),
      login: new Lena.views.Login(options)
    };

    this.subviews = {
      toolbar: new Lena.views.Toolbar(options)
    };
    
    this.session.on('change:userCtx', this.render, this);
    this.pages.on('reset', this.render, this);
    this.pages.on('change:title change:subtitle change:folder', this.render, this);
  },

  setAppView: function(name) {
    this.subviews.app = this.appViews[name];
  },

  // set document title
  setTitle: function() {
    var doc = _.first(this.pages.docs());

    document.title = _.compact([
      this.ddoc.get('title'),
      doc && doc.get('folder'),
      this.pages.single() && doc && doc.get('title')
    ]).join(' - ');
  },
  
  // set title when rendering
  render: function() {
    Backbone.View.prototype.render.call(this);

    this.setTitle();

    return this;
  },
  
  go: function(e) {
    var href = e.target.getAttribute('href');

    this.router.navigate(href, { trigger: true });

    return false;
  }
});
