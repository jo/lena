function(head, req) {
  var render = require('lib/render').render,
      view = { docs: [] },
      template,
      row;

  start({
    "headers": {
      "Content-Type": "text/html; charset=utf-8"
     }
  });

  while(row = getRow()) {
    view.docs.push(row.doc);
  }

  if (view.docs.length === 1) {
    template = this.templates.show;
  } else {
    template = this.templates.list;
  }

  render(this, req.userCtx, view, template);
}
