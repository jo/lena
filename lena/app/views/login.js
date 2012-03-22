Lena.views.Login = Backbone.View.extend({
  template: 'login',

  events: {
    'submit form.login': 'login'
  },
  
  render: function() {
    if (this.model.username()) {
      window.location.replace('/');

      return this;
    } else {
      return Backbone.View.prototype.render.call(this);
    }
  },

  login: function() {
    this.model.login(this.$('[name=username]').val(), this.$('[name=password]').val());

    return false;
  }
});
