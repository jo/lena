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
          x: -63,
          y: -28
        };

   function isLeft(e) {
     return e.clientX < $image.offset().left + $image.width() / 2;
   }

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
        var bwd = isLeft(e),
            offsetX = bwd ? cursorOffset.x : 8;

        if (bwd) {
          $cursor.addClass('bwd');
          $cursor.removeClass('fwd');
        } else {
          $cursor.addClass('fwd');
          $cursor.removeClass('bwd');
        }

        $cursor.show().css('left', e.clientX + offsetX).css('top', e.clientY + cursorOffset.y);
      });
      $image.click(function(e){
        if (isLeft(e)) {
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
