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
    let { books } = doc;
    if (books) {
      books.push(data);
    } else {
      books = [data];
    }
    return {
      ...doc,
      books,
    };
  });
}

module.exports.register = (router) => {
  router.post('/:id/book/', validate(schema), handler);
};
