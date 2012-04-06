exports.render = function(ddoc, userCtx, view, partial) {
  var url = require('lib/url'),
      render = require('lib/mustache').to_html;

  view.title = ddoc.title;
  view.description = ddoc.description;
  view.author = ddoc.author;
  view.username = userCtx.name;
  view.editable = userCtx.roles && userCtx.roles.indexOf('_admin') > -1;
  view.folders = [];
  view.docs || (view.docs = []);
  view.docs.forEach(function(doc) {
    doc.url = url.page(doc);

    if (view.folders.indexOf(doc.folder) === -1) {
      view.folders.push(doc.folder);
    }
  });
  if (view.docs.length > 0) {
    view.title += ' - ' + view.docs[0].folder;
    if (view.docs.length === 1) {
      view.title += ' - ' + view.docs[0].title;
    }
  }
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
