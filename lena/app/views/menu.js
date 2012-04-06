Lena.views.Menu = Backbone.View.extend({
  template: 'menu',

  events: {
    'click [data-player=start]': 'start',
    'click [data-player=stop]': 'stop',
    'click a[href=~/]': 'go'
  },
  
  initialize: function(options) {
    this.ddoc = options.ddoc;
    this.router = options.router;
    this.pages = options.pages;
  },
  
  view: function() {
    var next = this.pages.next(),
        previous = this.pages.previous();

    return {
      menu: this.ddoc.menu(this.pages.folders()),
      playing: this.playing,
      showPlayer: this.pages.single() && !!(next || previous),
      next: next && next.toJSON(),
      previous: previous && previous.toJSON()
    };
  },

  play: function() {
    var next = this.pages.next();

    if (!this.playing) {
      return;
    }

    this.router.navigate(Lena.helpers.url.page(next.toJSON()), { trigger: true });

    _.delay(_.bind(this.play, this), 1000);
  },
  
  start: function() {
    this.playing = true;
    this.play();

    return false;
  },
  
  stop: function() {
    this.$('.player').removeClass('playing');
    this.playing = false;

    return false;
  },
  
  go: function(e) {
    this.router.navigate(e.target.getAttribute('href'), { trigger: true });

    return false;
  }
});
