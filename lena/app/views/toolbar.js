Lena.views.Toolbar = Backbone.View.extend({
  template: 'toolbar',

  events: {
    'click [data-action=destroy]': 'destroy',
    'click [data-action=logout]': 'logout',
    'click [data-command]': 'format'
  },
  
  initialize: function(options) {
    this.router = options.router;
    this.session = options.session;
    this.pages = options.pages;
  },
  
  view: function() {
    return {
      username: this.session.username(),
      editing: this.pages.single(),
      images: this.pages.images()
    };
  },
  
  format: _.debounce(function(e) {
    var button = $(e.target);

    document.execCommand(button.data('command'), false, button.data('value'));

    return false;
  }, 100),
  
  destroy: _.debounce(function() {
    var folders = this.pages.folders(),
        url = folders.length > 0 ? Lena.helpers.url.folder(_.first(folders)) : '/';

    if (confirm('Really delete?')) {
      _.invoke(this.pages.docs(), 'destroy', {
        success: _.bind(function() {
          this.router.navigate(url, { trigger: true, replace: true });
        }, this)
      });
    }

    return false;
  }, 100),

  logout: function() {
    this.session.logout();
    window.location.reload();
  }
});
