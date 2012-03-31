Lena.views.Drop = Backbone.View.extend({
  initialize: function(options) {
    this.session = options.session;
    this.pages = options.pages;

    this.session.on('change:userCtx', this.render, this);

    this.render();
  },

  render: function() {
    // initialize native drag 'n' drop events
    if (this.session.username()) {
      document.body.ondrop = _.bind(this.drop, this);
      document.body.ondragover = _.bind(this.dragover, this);
      document.body.ondragenter = _.bind(this.dragenter, this);
      document.body.ondragleave = _.bind(this.dragleave, this);
    } else {
      document.body.ondrop = this.noop;
      document.body.ondragover = this.noop;
      document.body.ondragenter = this.noop;
      document.body.ondragleave = this.noop;
    }

    return this;
  },

  getDataIdElement: function(element) {
    if (!element) {
      return;
    }

    if (element === document.body) {
      return;
    }

    if ($(element).data('id')) {
      return element;
    }

    return this.getDataIdElement(element.parentNode);
  },

  ifConcerned: function(evt, fn) {
    var element = this.getDataIdElement(evt.target);

    if (element) {
      evt.stopPropagation();
      evt.preventDefault();

      fn.call(this, element);

      return false;
    }
  },

  dragover: function(evt) {
    this.ifConcerned(evt, function(element) {
      evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

      $(element).addClass('dragover');
    });
  },

  dragenter: function(evt) {
    this.ifConcerned(evt, function(element) {
      $(element).addClass('dragover');
    });
  },

  dragleave: function(evt) {
    this.ifConcerned(evt, function(element) {
      $(element).removeClass('dragover');
    });
  },

  // handle dropped images
  drop: function(evt) {
    this.ifConcerned(evt, function(element) {
      var files = evt.dataTransfer.files,
          reader = new FileReader(),
          canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'),
          img = new Image(),
          id = $(element).data('id');

      $(element).removeClass('dragover');
      $(element).focus();

      // crop and save image after image
      Lena.helpers.image.process({
        id: id,
        folder: this.pages.get(id).get('folder'),
        reader: reader,
        canvas: canvas,
        ctx: ctx,
        img: img,
        info: '#info',
        indicator: '#indicator',
        files: files,
        idx: 0,
        save: _.bind(this.saveImage, this)
      });
    });
  },
  
  saveImage: function(id, image, options) {
    var model = this.pages.get(id),
        attachments = model.get('_attachments') || {};

    model.save({
      _attachments: _.extend(attachments, image)
    }, options);
  }
});
