(function(url) {
  url || (url = {});

  // eg
  // 'Ich bin 1/3!' -> 'ich-bin-1-3'
  url.toParam = function(string) {
    return string.
      replace(/\W+/g, '-').
      replace(/(^[-\s]+)|([-\s]+$)/, '').
      toLowerCase();
  };

  // check if param pairs match,
  // eg
  // [
  //   ['a', 'A']
  // ] -> true
  // [
  //   ['a', 'a']
  //   ['a', 'b']
  // ] -> false
  url.match = function(params) {
    return _.all(params, function(parts) {
      return url.toParam(parts[0]) === url.toParam(parts[1]);
    });
  };
  
  // return url for folder
  // eg /portraits/
  url.folder = function(name) {
    return '/' + url.toParam(name);
  };
  
  // return url for page model,
  // eg /portraits/1-3-niobe
  url.page = function(model) {
    return '/' + url.toParam(model.folder) + '/' + url.toParam(model.title);
  };

  return url;
})(typeof module !== 'undefined' && module.exports ? exports : {});
