Lena.views.Editor = Backbone.View.extend({
  events: {
    'blur [contenteditable]': 'save',
    'keyup [contenteditable]': 'save'
  },
  
  initialize: function(options) {
    this.session = options.session;
    this.pages = options.pages;
  },

  save: _.throttle(_.debounce(function(e) {
    var element = $(e.target);
        
    this.pages.update(element.data('id'), element.data('attr'), element.html());
  }, 300), 1000)
});
