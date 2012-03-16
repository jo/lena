function(doc) {
  if (doc.type === 'page') {
    emit([doc.folder, doc.title, doc.position], null);
  }
}
