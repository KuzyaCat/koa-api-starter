const writerService = require('resources/writer/writer.service');

async function handler(ctx) {
  ctx.body = await writerService.findOne({ _id: ctx.params.id });
}

module.exports.register = (router) => {
  router.get('/:id', handler);
};
