const uniqid = require('uniqid');
const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const bookSchema = require('../book.schema');

async function handler(ctx) {
  const { title, genre } = ctx.validatedData;
  const _id = uniqid();

  ctx.body = await writerService._collection.update(
    { _id: ctx.params.id }, { $push: { books: { _id, title, genre } } },
  );
}

module.exports.register = (router) => {
  router.post('/:id/book/', validate(bookSchema), handler);
};
