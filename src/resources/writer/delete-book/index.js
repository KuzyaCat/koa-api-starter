const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const bookSchema = require('../book.schema');

async function handler(ctx) {
  ctx.body = await writerService.update({ _id: ctx.params.id }, (doc) => {
    const indexOfDelete = doc.books.findIndex((book) => book._id === ctx.params.book_id);
    if (indexOfDelete >= 0) {
      doc.books.splice(indexOfDelete, 1);
    }
    return doc;
  });
}

module.exports.register = (router) => {
  router.delete('/:id/book/:book_id', validate(bookSchema), handler);
};
