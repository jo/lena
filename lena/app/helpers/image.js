Lena.helpers.image = (function() {
  var maxWidth = 800,
      maxHeight = 600;

  function info(options, step) {
    var progress = (options.idx - step) / options.files.length,
        now = new Date(),
        est = new Date(options.startedAt.getTime() + (now.getTime() - options.startedAt.getTime()) / progress);

    $(options.info).html('Upload ' + Math.round(progress * 100) +  '% complete<br>Processing image ' + options.idx + ' of ' + options.files.length + ': ' + options.file.name + '<br>Ready in ' + est.toRelativeTime());
  }

  // crop via canvas
  function crop(options) {
    options.startedAt || (options.startedAt = new Date());

    $(options.indicator).show();
    info(options, 0.9);

    // Closure to capture the file information.
    options.reader.onload = function(e) {
      info(options, 0.7);

      options.img.onload = function() {
        var width, height;

        if (options.img.width > maxWidth) {
          width = maxWidth;
          height = options.img.height * width / options.img.width;
        } else {
          width = options.img.width;
          height = options.img.height;
        }

        if (options.img.height > maxHeight) {
          height = maxHeight;
          width = options.img.width * height / options.img.height;
        }

        options.canvas.setAttribute('width', width + 'px');
        options.canvas.setAttribute('height', height + 'px');

        options.ctx.clearRect(0, 0, width, height);
        options.ctx.drawImage(options.img, 0, 0, width, height);

        info(options, 0.7);
        
        var attachment = {};

        // get image
        options.data = options.canvas.toDataURL('image/jpeg');

        // check content type
        // (does your browser support canvas.toDataURL('image/jpeg')?)
        var contentType = options.data.replace(/^.*(image\/[^;,]+).*$/, '$1');
        options.data = options.data.slice(13 + contentType.length);
        options.fileName = options.file.name.replace(/\.(png|jpg|jpeg)$/i, '.' + contentType.split('/')[1]);

        attachment[options.fileName] = {
          content_type: contentType,
          data: options.data
        };

        info(options, 0.5);

        options.save(options.id, attachment, {
          success: function(model) {
            info(options, 0);

            model.trigger('upload-complete', {
              url: Lena.helpers.url.image({ folder: options.folder, _id: options.id }, options.fileName)
            });
            document.execCommand('insertImage', false, Lena.helpers.url.image(model.toJSON(), options.fileName));

            // next image
            process(options);
          }
        });
      };

      options.img.src = e.target.result;
    };

    // Read in the image file as a data URL.
    options.reader.readAsDataURL(options.file);
  }

  function process(options) {
    var p;

    options.file = options.files[options.idx];

    if (!options.file) {
      $(options.indicator).hide();
      return;
    }

    options.idx++;

    if (options.file.type.match('image.*')) {
      crop(options);
    } else {
      process(options);
    }
  }

  return {
    process: process
  };
})();
