Lena.views.Toolbar = Backbone.View.extend({
  template: 'toolbar',

  events: {
    'click [data-action=new]': 'newPage',
    'click [data-folder]': 'setFolder',
    'submit [data-dialog=new]': 'createPage',
    'click [data-action=edit]': 'editPage',
    'submit [data-dialog=edit]': 'updatePage',
    'click [data-action=destroy]': 'destroy',
    'click [data-action=logout]': 'logout',
    'click [data-command]': 'format'
  },
  
  initialize: function(options) {
    this.ddoc = options.ddoc;
    this.router = options.router;
    this.session = options.session;
    this.pages = options.pages;

    this.pages.on('upload-complete', this.uploadComplete, this);
  },
  
  view: function() {
    return {
      username: this.session.username(),
      editing: this.pages.single(),
      folders: _.uniq(this.pages.pluck('folder').concat(this.ddoc.get('menu'))).sort(),
      images: this.pages.images(),
      pages: this.pages.toJSON()
    };
  },
  
  format: _.debounce(function(e) {
    var button = $(e.target);

    document.execCommand(button.data('command'), false, button.data('value'));

    return false;
  }, 100),
  
  // new page
  newPage: _.debounce(function() {
    this.$('[data-dialog=edit]').hide();
    this.$('[data-dialog=new]').toggle().find('input[name=folder]').focus();
  }, 100),
  
  createPage: function(e) {
    var form = $(e.target);

    this.pages.create({
      folder: form.find('input[name=folder]').val(),
      title: form.find('input[name=title]').val()
    }, {
      success: _.bind(function(model) {
        this.router.navigate(Lena.helpers.url.page(model.toJSON()), { trigger: true });
      }, this)
    });

    return false;
  },

  // edit page
  editPage: _.debounce(function() {
    this.$('[data-dialog=new]').hide();
    this.$('[data-dialog=edit]').toggle().find('input[name=subtitle]').focus();
  }, 100),
  
  setFolder: function(e) {
    this.$('input[name=folder]').val($(e.target).data('folder'));
    this.$('input[name=title]').focus();

    return false;
  },
  
  updatePage: function(e) {
    var form = $(e.target),
        page = _.first(this.pages.docs());

    page.save({
      folder: form.find('input[name=folder]').val(),
      title: form.find('input[name=title]').val(),
      subtitle: form.find('input[name=subtitle]').val()
    });

    return false;
  },

  uploadComplete: function(image) {
    var button = this.$('button[data-value="' + image.url + '"]');

    if (button.length === 0) {
      button = $("<button>").attr('style','background-image: url(' + image.url + ')').attr('data-command', 'insertImage').attr('data-value', image.url);
      this.$('.images').append(button);
    } else {
      // reload image
      button.attr('style', 'background-image: url(' + image.url + '?' + Math.random() + ')');
    }
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
    this.session.logout({
      success: function() {
        window.location.reload();
      }
    });
  }
});
