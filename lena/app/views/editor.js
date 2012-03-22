Lena.views.Editor = Backbone.View.extend({
  events: {
    'blur [contenteditable]': 'save',
    'click [contenteditable]': 'save',
    'keyup [contenteditable]': 'save'
  },
  
  initialize: function(options) {
    this.session = options.session;
    this.pages = options.pages;
  },

  save: _.throttle(_.debounce(function(e) {
    var element = $(e.target),
        id = element.data('id'),
        attr = element.data('attr');
        
    id && attr && this.pages.update(id, attr, element.html());
  }, 300), 1000)
});
