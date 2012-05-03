Lena.views.Imagemap = Backbone.View.extend({
  initialize: function(options) {
    this.session = options.session;
    this.pages = options.pages;
    this.router = options.router;
  },

  buildMap: function(e) {
    var router = this.router,
        image = e.target,
        $image = $(image),
        middle = image.clientWidth / 2,
        previous = this.pages.previous(),
        next = this.pages.next(),
        $cursor = $('#cursor'),
        cursorOffset = {
          x: 5,
          y: -28
        };

    if (previous || next) {
      $image.mouseout(function(){
        $cursor.hide();
        return false;
      });
      $image.mouseenter(function(){
        $cursor.show();
        return false;
      });
      $image.mousemove(function(e){
        if (e.clientX < image.x + middle) {
          $cursor.addClass('bwd');
          $cursor.removeClass('fwd');
        } else {
          $cursor.addClass('fwd');
          $cursor.removeClass('bwd');
        }

        $cursor.css('left', e.clientX + cursorOffset.x).css('top', e.clientY + cursorOffset.y);
      });
      $image.click(function(e){
        if (e.clientX < image.x + middle) {
          // bwd
          previous && router.navigate(Lena.helpers.url.page(previous.toJSON()), { trigger: true });
        } else {
          // fwd
          next && router.navigate(Lena.helpers.url.page(next.toJSON()), { trigger: true });
        }

        return false;
      });

      // preload
      previous && previous.preload();
      next && next.preload();
    }
  },

  render: function() {
    var $cursor = $('#cursor'),
        $images = $('section article img');

    if (!this.session.canWrite()) {
      $cursor.hide();
      $cursor.removeClass('bwd');
      $cursor.removeClass('fwd');

      $images.addClass('cursored');
      $images.on('load', _.bind(this.buildMap, this));
    }
  }
});
