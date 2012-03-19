function(doc) {
  if (doc.type === 'page') {
    emit([doc.folder, doc.position], null);
  }
}
