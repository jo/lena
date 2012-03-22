function(head, req) {
  var render = require('lib/render').render,
      key = Math.round(Math.random() * 100),
      i = 0,
      row, doc;

  start({
    "headers": {
      "Content-Type": "text/html; charset=utf-8"
     }
  });

  while(row = getRow()) {
    i++;
    doc = row.doc;

    if (i === key) {
      break;
    }
  }

  render(this, req.userCtx, { docs: doc ? [doc] : [] }, this.templates.show);
}
