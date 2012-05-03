Lena.views.Show = Backbone.View.extend({
  template: 'show',

  initialize: function(options) {
    this.session = options.session;
    this.ddoc = options.ddoc;
    this.pages = options.pages;

    this.subviews = {
      menu: new Lena.views.Menu(options)
    };
  },
  
  view: function() {
    return {
      title: this.ddoc.get('title'),
      editable: this.session.canWrite(),
      docs: this.pages.toJSON()
    };
  },

  buildMap: function(e) {
    var image = e.target,
        height = image.clientHeight,
        width = image.clientWidth,
        next = this.pages.next(),
        previous = this.pages.previous(),
        map = document.getElementById('image-player') || document.createElement('map'),
        left = previous && document.createElement('area'),
        right = next && document.createElement('area'),
        cursor = $('#cursor'),
        cursorOffset = {
          x: -55,
          y: -28
        };

    image.setAttribute('usemap', '#image-player');

    map.setAttribute('name', 'image-player');

    if (left) {
      left.setAttribute('shape', 'rect');
      left.setAttribute('coords', '0,0,'  + width/2 + ',' + height);
      left.setAttribute('href', Lena.helpers.url.page(previous.toJSON()));
      left.onfocus = blur;

      $(left).mouseout(function(){
        cursor.hide();
        cursor.removeClass('bwd');

        return false;
      });
      $(left).mouseenter(function(){
        cursor.addClass('bwd');
        cursor.show();

        return false;
      });
      $(left).mousemove(function(e){
        cursor.css('left', e.clientX + 5).css('top', e.clientY + cursorOffset.y);
      });

      previous.preload();

      map.appendChild(left);
    }

    if (right) {
      right.setAttribute('shape', 'rect');
      right.setAttribute('coords', ''  + width/2 + ',0,' + width + ',' + height);
      right.setAttribute('href', Lena.helpers.url.page(next.toJSON()));
      right.onfocus = blur;

      $(right).mouseout(function(){
        cursor.hide();
        cursor.removeClass('fwd');

        return false;
      });
      $(right).mouseenter(function(){
        cursor.addClass('fwd');
        cursor.show();

        return false;
      });
      $(right).mousemove(function(e){
        cursor.css('left', e.clientX + cursorOffset.x).css('top', e.clientY + cursorOffset.y);
      });

      next.preload();

      map.appendChild(right);
    }

    image.parentNode.appendChild(map);
  },

  render: function() {
    var cursor = $('#cursor');

    if (!this.session.canWrite()) {
      cursor.hide();
      cursor.removeClass('bwd');
      cursor.removeClass('fwd');
    }

    Backbone.View.prototype.render.call(this);

    if (!this.session.canWrite()) {
      $('section article img').on('load', _.bind(this.buildMap, this));
    }

    return this;
  }
});
