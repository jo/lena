exports.render = function(ddoc, userCtx, docs) {
  var render = require('lib/mustache').to_html,
      menu = [],
      currentFolders = [];

  docs.forEach(function(doc) {
    doc.url = '/' + encodeURIComponent(doc.folder) + '/' + encodeURIComponent(doc.title);

    if (currentFolders.indexOf(doc.folder) === -1) {
      currentFolders.push(doc.folder);
    }
  });

  ddoc.menu.forEach(function(entry) {
    menu.push({
      url: '/' + encodeURIComponent(entry),
      title: entry,
      current: currentFolders.indexOf(entry) > -1
    });
  });

  render(ddoc.templates.index, {
    title: ddoc.title,
    description: ddoc.description,
    author: ddoc.author,

    menu: menu,
    doc: (docs.length === 1 && docs[0]) || (docs.length === 0 && { article: '<h1>Not Found</h1>' }),
    docs: docs.length > 1 && docs,

    payload: JSON.stringify({
      ddoc: ddoc,
      session: {
        userCtx: userCtx
      }
    }).replace(/<\/script>/g, '<\\\\/script>')
  }, ddoc.templates, send);
};
