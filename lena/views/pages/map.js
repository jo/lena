function(doc) {
  if (doc.type === 'page') {
    emit([doc.folder, doc.title], null);
  }
}
