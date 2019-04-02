const log = require("../utils/logger");

module.exports = async (ctx, next) => {
  if (
    ctx.url.split('?')[0] === "/api/js-error" &&
    (ctx.method === "GET" || ctx.method === "POST")
  ) {
    let data =
      ctx.method === "GET" ? JSON.parse(ctx.request.query.message) : ctx.request.body;
    log.info(data);
  }
  await next();
};
