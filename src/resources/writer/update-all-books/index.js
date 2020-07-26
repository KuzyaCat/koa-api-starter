const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');
const bookSchema = require('../book.schema');

const schema = Joi.object({
  books: Joi.array().items(bookSchema),
});

async function handler(ctx) {
  const data = ctx.validatedData;
  ctx.body = await writerService.update({ _id: ctx.params.id }, { $set: { books: data.books } });
}

module.exports.register = (router) => {
  router.put('/:id/book/all', validate(schema), handler);
};
