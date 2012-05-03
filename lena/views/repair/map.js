function(doc) {
  if (doc.article && doc.article.match('<map')) {
    emit(doc._id, doc.article.replace(/<map.*map>/g, '').replace(/ usemap="#image-player"/, ''));
  }
}
