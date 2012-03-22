Lena.collections.Pages = Backbone.Collection.extend({
  model: Lena.models.Page,

  url: '/api/pages',

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

  docs: function() {
    if (this.length === 0) {
      return [];
    }

    if (!this.folder) {
      return this.random();
    }

    return this.filter(function(model) {
      return model.match(this.folder, this.page);
    }, this);
  },

  folders: function() {
    return _.compact(_.uniq(_.invoke(this.docs(), 'get', 'folder')));
  },

  single: function() {
    return this.docs().length === 1;
  },

  toJSON: function() {
    return this.docs().map(function(model) {
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
