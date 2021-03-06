const writerService = require('resources/writer/writer.service');

async function handler(ctx) {
  ctx.body = (await writerService.remove({ _id: ctx.params.id })).results;
}

module.exports.register = (router) => {
  router.delete('/:id', handler);
};
