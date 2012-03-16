function(head, req, userCtx, secObj) {
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

  render(this, userCtx, docs);
}
