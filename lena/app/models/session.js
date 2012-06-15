Lena.models.Session = Backbone.Model.extend({
  urlRoot: '/_session',

  canWrite: function() {
    // TODO: adjust for admin party mode
    return this.isAdmin() // && this.username();
  },

  username: function() {
    return this.has('userCtx') && this.get('userCtx').name;
  },

  roles: function() {
    return this.has('userCtx') && this.get('userCtx').roles;
  },

  isAdmin: function() {
    var roles = this.roles();

    return roles && _.indexOf(roles, '_admin') > -1;
  },

  login: function(name, password) {
    var that = this;

    if (name && password) {
      $.ajax({
        url: this.urlRoot,
        type: 'POST',
        dataType: 'json',
        data: 'name=' + encodeURIComponent(name) + '&password=' + encodeURIComponent(password),
        success: function(resp) {
          // fix a bug if admin logged in
          // https://issues.apache.org/jira/browse/COUCHDB-1356
          if (resp.name === null) {
            resp.name = name;
          }
          // update session model
          that.set({ userCtx: resp });
        }
      });
    } else {
      return 'Need username and password.'
    }
  },

  logout: function(options) {
    var that = this;

    $.ajax({
      url: this.urlRoot,
      type: 'DELETE',
      success: function() {
        // clear userCtx
        that.unset('userCtx');
        if (typeof options.success === 'function') {
          options.success();
        }
      }
    });
  }
});
