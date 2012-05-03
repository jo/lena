// Backbone, Couch & Mustache

// adjust id attribute
Backbone.Model.prototype.idAttribute = '_id';

// delete models (append rev)
Backbone.Model.prototype.destroy = (function() {
  var oldDestroy = Backbone.Model.prototype.destroy;

  return function(options) {
    options || (options = {});
    options.headers || (options.headers = {});

    options.headers['If-Match'] = this.get('_rev');

    oldDestroy.call(this, options);
  };
})();

// copy models
Backbone.Model.prototype.copy = function(id, options) {
  var success = options.success,
      model = this.clone();

  options || (options = {});
  options.headers || (options.headers = {});
  options.headers['Destination'] = id;
  options.type = 'COPY';
  options.url = this.url();
  options.contentType = 'application/json';
  options.dataType = 'json';

  model.collection = this.collection;
  model.unset('_id', { silent: true });
  model.unset('_rev', { silent: true });

  options.success = function(resp) {
    model.set({
      _id: resp.id,
      _rev: resp.rev
    });

    if (typeof success === 'function') {
      success(model);
    }
  };

  $.ajax(options);
};

// save models (update rev)
Backbone.Model.prototype.save = (function() {
  var oldSave = Backbone.Model.prototype.save;

  return function(attributes, options) {
    options || (options = {});

    var success = options.success;

    options.success = function(model, response) {
      model.set({ _rev: response._rev }, { silent: true });

      if (typeof success === 'function') {
        success(model, response);
      }
    };

    oldSave.call(this, attributes, options);
  };
})();

// parse models
Backbone.Model.prototype.parse = function(response) {
  // adjust rev
  if (response.rev) {
    response._rev = response.rev;
    delete response.rev;
  }

  // adjust id
  if (response.id) {
    response._id = response.id;
    delete response.id;
  }

  // remove ok
  delete response.ok;

  return response;
};

// parse collections
Backbone.Collection.prototype.parse = function(response) {
  return response.rows && _.map(response.rows, function(row) { return row.doc });
};

// render
Backbone.View.prototype.render = (function() {
  var bootedAt = new Date().getTime(),
      t = [0, 0, 0, 0, 0, 0, 0, 1];

  // slighlty pp'ed version from
  // http://www.jquery4u.com/jquery-date-and-time-2/online-jquery-stopwatch/
  function format(ms) {
      // used to do a substr, but whoops, different browsers, different formats
      // so now, this ugly regex finds the time-of-day bit alone
      var date = new Date(ms + t[5]).toLocaleTimeString(),
          string = String(ms % 1000);

      while (string.length < 3) {
        string = '0' + string;
      }

      date += '.' + string;

      return date;
  }

  return function() {
    var now = new Date;
    
    console.log(format(now.getTime() - bootedAt) + ' render' + (this.name ? ' ' + this.name : '') + (this.template ? ' (' + this.template + ')' : ''));

    // render template if present
    if (this.template) {
      var view = !this.view ? {} : (typeof this.view === 'function' ? this.view() : this.view);
      
      this.$el.html(Mustache.to_html(template(this.template), view, this.partials ? template(this.partials) : {}));

      this.$el.addClass(this.template);
    }

    // render subviews
    if (this.subviews) {
      _.each(this.subviews, function(view, name) {
        view.setElement(this.$('#' + name));
        view.render();
      }, this);
    }

    return this;
  };
})();

// serializeForm
Backbone.View.prototype.serializeForm = function(selector) {
  var json = {};

  _.each(this.$(selector).serializeArray(), function(value) {
    json[value.name] = value.value;
  });

  return json;
};

// noop
Backbone.View.prototype.noop = function() {
  return false;
};
