Lena.helpers.url = (function() {
  function toParam(string) {
    return string.
      replace(/\W+/g, '-').
      replace(/(^[-\s]+)|([-\s]+$)/, '').
      toLowerCase();
  }

  return {
    // check if param pairs match,
    // eg
    // [
    //   ['a', 'A']
    // ] -> true
    // [
    //   ['a', 'a']
    //   ['a', 'b']
    // ] -> false
    match: function(params) {
      return _.all(params, function(parts) {
        return toParam(parts[0]) === toParam(parts[1]);
      });
    },
    
    // return url for folder
    // eg /portraits/
    folder: function(name) {
      return '/' + toParam(name);
    },
    
    // return url for page model,
    // eg /portraits/1-3-niobe
    page: function(model) {
      return '/' + toParam(model.get('folder')) + '/' + toParam(model.get('title'));
    }
  };
})();
