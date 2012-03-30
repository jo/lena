function(doc) {
  if (doc.type === 'app' && doc.style) {
    emit(doc._id, doc.style);
  }
}
