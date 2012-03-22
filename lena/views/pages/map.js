function(doc) {
  if (doc.type === 'page') {
    emit([doc.folder, doc._id], null);
  }
}
