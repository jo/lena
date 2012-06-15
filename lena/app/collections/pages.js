Lena.collections.Pages = Backbone.Collection.extend({
  model: Lena.models.Page,

  url: '/api/pages',

  initialize: function() {
    this.on('reset', function() {
      delete this._docs;
    }, this);
  },

  comparator: function(page) {
    return [page.get('folder'), page.get('position')];
  },

  setScope: function(folder, page) {
    this.folder = folder;
    this.page = page;

    this.trigger('reset');
  },

  random: function() {
    if (this.length === 0) {
      return [];
    }

    return [
      this.at(Math.round(Math.random() * (this.length - 1)))
    ];
  },

  getDocs: function() {
    if (this.length === 0) {
      return [];
    }

    if (!this.folder) {
      return this.random();
    }

    return _.sortBy(this.filter(function(model) {
      return model.match(this.folder, this.page);
    }, this), function(page) { return this.comparator(page); }, this);
  },

  docs: function() {
    if (!this._docs) {
      this._docs = this.getDocs();
    }

    return this._docs;
  },

  images: function() {
    return _.flatten(_.invoke(this.docs(), 'images'));
  },

  folders: function() {
    return _.compact(_.uniq(_.invoke(this.docs(), 'get', 'folder')));
  },

  single: function() {
    return this.docs().length === 1;
  },

  multiple: function() {
    return this.docs().length > 1;
  },

  previous: function() {
    var current = this.single() && _.first(this.docs()),
        idx = current && this.indexOf(current),
        previous = idx && idx > 0 && _.last(this.filter(function(page) {
          return page.match(this.folder) && this.indexOf(page) < idx;
        }, this));

    previous || (previous = _.last(this.filter(function(page) { return page.match(this.folder) && page != current; }, this)));

    return previous;
  },

  next: function() {
    var current = this.single() && _.first(this.docs()),
        idx = current && this.indexOf(current),
        next = idx && this.find(function(page) {
          return page.match(this.folder) && this.indexOf(page) > idx;
        }, this);

    next || (next = this.find(function(page) { return page.match(this.folder) && page != current; }, this));

    return next;
  },

  toJSON: function() {
    return _.map(this.docs(), function(model) {
      var doc = model.toJSON();

      return _.extend(doc, { url: Lena.helpers.url.page(doc) });
    });
  },

  update: function(id, key, value) {
    var model = this.get(id),
        attributes = {};

    if (model.get(key) === value) {
      return;
    }
    
    attributes[key] = value;

    model.save(attributes);
  }
});
