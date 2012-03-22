function(doc) {
  var url = require('views/lib/url');

  if (doc.type === 'page') {
    emit([url.toParam(doc.folder), url.toParam(doc.title)], null);
  }
}
