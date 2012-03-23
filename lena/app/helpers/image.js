Lena.helpers.image = (function() {
  var maxWidth = 600;

  // crop via canvas
  function crop(options) {
    // Closure to capture the file information.
    options.reader.onload = function(e) {
      $(options.info).html(Math.round(((options.idx - 0.7) / options.files.length) * 100) +  '% ' + options.file.name);

      options.img.onload = function() {
        var width, height;

        if (options.img.width > maxWidth) {
          width = maxWidth
          height = options.img.height * width / options.img.width;
        } else {
          width = options.img.width;
          height = options.img.height;
        }

        options.canvas.setAttribute('width', width + 'px');
        options.canvas.setAttribute('height', height + 'px');

        options.ctx.clearRect(0, 0, width, height);
        options.ctx.drawImage(options.img, 0, 0, width, height);

        $(options.info).html(Math.round(((options.idx - 0.5) / options.files.length) * 100) +  '% ' + options.file.name);
        
        var attachment = {};
        attachment[options.file.name] = {
          content_type: 'image/png',
          data: options.canvas.toDataURL().slice(22)
        };

        options.save(options.id, attachment, {
          success: function(model) {
            $(options.info).html(Math.round((options.idx / options.files.length) * 100) +  '% ' + options.file.name);

            model.trigger('upload');
            document.execCommand('insertImage', false, Lena.helpers.url.image(model.toJSON(), options.file.name));

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
