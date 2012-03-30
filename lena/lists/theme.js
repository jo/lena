function(head, req) {
  var row;

  start({
    "headers": {
      "Content-Type": "text/css; charset=utf-8"
     }
  });

  while(row = getRow()) {
    send(row.value);
  }
}
