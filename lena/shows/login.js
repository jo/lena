function(doc, req) {
  var render = require('lib/render').render;

  render(this, req.userCtx, { docs: [] }, this.templates.login);
}
