Lena.views.Toolbar = Backbone.View.extend({
  template: 'toolbar',

  events: {
    'click [data-action=new]': 'newPage',
    'click [data-folder]': 'setFolder',
    'submit [data-dialog=new]': 'createPage',
    'click [data-action=edit]': 'editPage',
    'submit [data-dialog=edit]': 'updatePage',
    'click [data-action=destroy]': 'destroy',
    'click [data-action=sort]': 'sortPages',
    'submit [data-dialog=sort]': 'sortPagesDone',
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
      canWrite: this.session.canWrite(),
      show: this.pages.single(),
      list: this.pages.multiple(),
      folders: _.uniq(this.pages.pluck('folder').concat(this.ddoc.get('menu'))).sort(),
      currentFolder: this.pages.folder,
      images: this.pages.images(),
      pages: this.pages.toJSON()
    };
  },

  toggleDialog: function(name) {
    this.$('[data-dialog]').each(function() {
      var el = $(this);

      if (el.data('dialog') === name) {
        el.toggle();
      } else {
        el.hide();
      }
    });
  },
  
  format: _.debounce(function(e) {
    var button = $(e.target);

    document.execCommand(button.data('command'), false, button.data('value'));

    return false;
  }, 100),
  
  // new page
  newPage: _.debounce(function() {
    this.toggleDialog('new');
    this.$('[data-dialog=new] input[name=folder]').focus();
  }, 100),

  getInput: function(form, key) {
    var input = form.find('input[name="' + key + '"]'),
        value = input.val();

    value || (value = '');
    value = value.replace(/\s+/g, ' ').replace(/^ /, '').replace(/ $/, '');

    input.val(value);

    return value;
  },
  
  createPage: function(e) {
    var form = $(e.target);

    this.pages.create({
      folder: this.getInput(form, 'folder'),
      title: this.getInput(form, 'title'),
      subtitle: this.getInput(form, 'subtitle'),
      position: (new Date).getTime()
    }, {
      success: _.bind(function(model) {
        this.router.navigate(Lena.helpers.url.page(model.toJSON()), { trigger: true });
      }, this)
    });

    return false;
  },

  // edit page
  editPage: _.debounce(function() {
    this.toggleDialog('edit');
    this.$('[data-dialog=edit] input[name=subtitle]').focus();
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
      folder: this.getInput(form, 'folder'),
      title: this.getInput(form, 'title'),
      subtitle: this.getInput(form, 'subtitle'),
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
  
  destroy: function() {
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
  },
  
  sortPages: _.debounce(function() {
    var collection = this.pages;

    this.toggleDialog('sort');
    $("article ol.list").sortable({
      stop: function(e, ui) {
        var currElement = $(ui.item[0]),
            curr = collection.get(currElement.data('id')),
            nextElement = currElement.next('li'),
            next = nextElement && collection.get(nextElement.data('id')),
            n = next && next.get('position'),
            prevElement = currElement.prev('li'),
            prev = prevElement && collection.get(prevElement.data('id')),
            p = prev && prev.get('position');

        p || (p = 0);
        n || (n = p + 100);

        if (next && prev) {
          curr.save({ position: p + (n - p) / 2 });
        } else {
          if (next) {
            curr.save({ position: n - 0.5 });
          } else {
            if (prev) {
              curr.save({ position: p + 0.5 });
            }
          }
        }
      }
    });
  }, 100),

  sortPagesDone: function() {
    this.$('[data-dialog=sort]').hide();
    $("article ol.list").sortable('destroy');
    this.pages.trigger('reset');

    return false;
  },

  logout: function() {
    this.session.logout({
      success: function() {
        window.location.reload();
      }
    });
  }
});
