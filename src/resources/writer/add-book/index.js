const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const bookSchema = require('../book.schema');

async function handler(ctx) {
  const data = ctx.validatedData;
  ctx.body = await writerService._collection.update({ _id: ctx.params.id }, { $push: { books: data } });
}

module.exports.register = (router) => {
  router.post('/:id/book/', validate(bookSchema), handler);
};
