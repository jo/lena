Lena.views.Login = Backbone.View.extend({
  template: 'login',

  events: {
    'submit form.login': 'login'
  },

  initialize: function(options) {
    this.session = options.session
  },
  
  render: function() {
    if (this.session.username()) {
      window.location.replace('/');

      return this;
    } else {
      return Backbone.View.prototype.render.call(this);
    }
  },

  login: function() {
    this.session.login(this.$('[name=username]').val(), this.$('[name=password]').val());

    return false;
  }
});
