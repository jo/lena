function(head, req) {
  var render = require('lib/list').render,
      docs = [],
      row;

  start({
    "headers": {
      "Content-Type": "text/html; charset=utf-8"
     }
  });

  while(row = getRow()) {
    docs.push(row.doc);
  }

  render(this, req.userCtx, docs);
}
