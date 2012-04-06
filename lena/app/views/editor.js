Lena.views.Editor = Backbone.View.extend({
  events: {
    'focus [contenteditable]': 'save',
    'blur [contenteditable]': 'save',
    'click [contenteditable]': 'save',
    'keyup [contenteditable]': 'save'
  },

  initialize: function(options) {
    this.session = options.session;
    this.pages = options.pages;

    // hmmm - this seems not to work
    document.execCommand('enableObjectResizing', false, false);
    document.execCommand('insertBrOnReturn', false, false);
  },

  save: _.throttle(function(e) {
    var element = $(e.target),
        id = element.data('id'),
        attr = element.data('attr');
        
    $('#indicator:visible').length === 0 && id && attr && this.pages.update(id, attr, element.html());
  }, 1000)
});
