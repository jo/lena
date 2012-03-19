Lena.views.Folder = Backbone.View.extend({
  initialize: function(options) {
    this.router = options.router;

    this.subviews = {
      toolbar: new Lena.views.Toolbar({
        el: '#toolbar',
        model: this.model
      })
    };
    
    this.model.on('change:userCtx', this.render, this);
  }
});
