function(doc) {
  //if (doc.type === 'page' && doc._attachments && Object.keys(doc._attachments).length > 0) {
  if (doc.type === 'page' && doc._attachments) {
    emit(Math.random(), null);
  }
}
