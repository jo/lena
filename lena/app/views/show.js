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
      editable: this.session.isAdmin(),
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
        right = next && document.createElement('area');

    image.setAttribute('usemap', '#image-player');

    map.setAttribute('name', 'image-player');

    if (left) {
      left.setAttribute('shape', 'rect');
      left.setAttribute('coords', '0,0,'  + width/2 + ',' + height);
      left.setAttribute('href', Lena.helpers.url.page(previous.toJSON()));
      left.setAttribute('title', 'Previous');
      map.appendChild(left);
    }

    if (right) {
      right.setAttribute('shape', 'rect');
      right.setAttribute('coords', ''  + width/2 + ',0,' + width + ',' + height);
      right.setAttribute('href', Lena.helpers.url.page(next.toJSON()));
      right.setAttribute('title', 'Next');
      map.appendChild(right);
    }

    image.parentNode.appendChild(map);
  },

  render: function() {
    Backbone.View.prototype.render.call(this);

    $('section article img').on('load', _.bind(this.buildMap, this));

    return this;
  }
});
