const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  _id: Joi.string(),
  title: Joi.string(),
  genre: Joi.string().valid('novel', 'poem'),
});

async function handler(ctx) {
  const data = ctx.validatedData;
  ctx.body = await writerService.update({ _id: ctx.params.id }, (doc) => {
    const indexOfUpdate = doc.books.findIndex((book) => book._id === ctx.params.book_id);
    const { books } = doc;
    books[indexOfUpdate] = {
      ...books[indexOfUpdate],
      ...data,
    };
    return doc;
  });
}

module.exports.register = (router) => {
  router.put('/:id/book/:book_id', validate(schema), handler);
};
