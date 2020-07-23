const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');

const book = Joi.object().keys({
  title: Joi.string(),
  genre: Joi.string().valid('novel', 'poem'),
});

const schema = Joi.object({
  books: Joi.array().items(book),
});

async function handler(ctx) {
  const data = ctx.validatedData;
  ctx.body = await writerService.update({ _id: ctx.params.id }, (doc) => {
    let { books } = doc;
    books = data;
    return {
      ...doc,
      books,
    };
  });
}

module.exports.register = (router) => {
  router.put('/:id/book/all', validate(schema), handler);
};
