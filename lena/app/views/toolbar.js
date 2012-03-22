Lena.views.Toolbar = Backbone.View.extend({
  template: 'toolbar',

  events: {
    'click [data-action=create]': 'create',
    'submit [data-dialog=create]': 'createPage',
    'click [data-folder]': 'setFolder',
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
      folders: _.uniq(this.pages.pluck('folder')),
      images: this.pages.images()
    };
  },
  
  format: _.debounce(function(e) {
    var button = $(e.target);

    document.execCommand(button.data('command'), false, button.data('value'));

    return false;
  }, 100),
  
  create: _.debounce(function() {
    this.$('[data-dialog=create]').toggle().find('input[name=folder]').focus();
  }, 100),
  
  setFolder: function(e) {
    this.$('input[name=folder]').val($(e.target).data('folder'));
    this.$('input[name=title]').focus();

    return false;
  },
  
  createPage: function(e) {
    this.pages.create({
      folder: this.$('input[name=folder]').val(),
      title: this.$('input[name=title]').val()
    }, {
      success: _.bind(function(model) {
        this.router.navigate(Lena.helpers.url.page(model.toJSON()), { trigger: true });
      }, this)
    });

    return false;
  },
  
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
