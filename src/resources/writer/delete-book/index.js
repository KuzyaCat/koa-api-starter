const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const bookSchema = require('../book.schema');

async function handler(ctx) {
  ctx.body = await writerService._collection.update(
    { _id: ctx.params.id },
    { $pull: { books: { _id: ctx.params.book_id } } },
  );
}

module.exports.register = (router) => {
  router.delete('/:id/book/:book_id', validate(bookSchema), handler);
};
