const Router = require('@koa/router');

const router = new Router();

require('./create').register(router);
require('./update').register(router);
require('./delete').register(router);
require('./get').register(router);
require('./add-book').register(router);
require('./delete-book').register(router);
require('./update-book').register(router);
require('./update-all-books').register(router);

module.exports = router.routes();
