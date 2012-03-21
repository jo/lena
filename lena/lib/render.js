exports.render = function(ddoc, userCtx, view, partial) {
  var render = require('lib/mustache').to_html;

  view.title = ddoc.title;
  view.description = ddoc.description;
  view.author = ddoc.author;
  view.username = userCtx.name;
  view.folders = [];
  view.docs || (view.docs = []);
  view.docs.forEach(function(doc) {
    doc.url = '/' + encodeURIComponent(doc.folder) + '/' + encodeURIComponent(doc.title);

    if (view.folders.indexOf(doc.folder) === -1) {
      view.folders.push(doc.folder);
    }
  });
  view.menu = [];
  ddoc.menu.forEach(function(entry) {
    view.menu.push({
      url: '/' + encodeURIComponent(entry),
      title: entry,
      current: view.folders.indexOf(entry) > -1
    });
  });
  view.payload = JSON.stringify({
    ddoc: ddoc,
    session: {
      userCtx: userCtx
    }
  }).replace(/<\/script>/g, '<\\\\/script>');

  render(ddoc.templates.index, view, {
    toolbar: ddoc.templates.toolbar,
    menu: ddoc.templates.menu,
    content: partial
  }, send);
};
