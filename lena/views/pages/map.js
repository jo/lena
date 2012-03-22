function(doc) {
  function toParam(string) {
    return string.
      replace(/\W+/g, '-').
      replace(/(^[-\s]+)|([-\s]+$)/, '').
      toLowerCase();
  }

  if (doc.type === 'page') {
    emit([toParam(doc.folder), toParam(doc.title)], null);
  }
}
