Lena.collections.Random = Backbone.Collection.extend({
  model: Lena.models.Page,

  urlRoot: '/api/random',

  url: function() {
    return this.urlRoot + '/?startkey=' + Math.random();
  }
});
