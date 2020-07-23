const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  _id: Joi.string(),
  title: Joi.string(),
  genre: Joi.string().valid('novel', 'poem'),
});

async function handler(ctx) {
  ctx.body = await writerService.update({ _id: ctx.params.id }, (doc) => {
    const indexOfDelete = doc.books.findIndex((book) => book._id === ctx.params.book_id);
    doc.books.splice(indexOfDelete, 1);
    return doc;
  });
}

module.exports.register = (router) => {
  router.delete('/:id/book/:book_id', validate(schema), handler);
};
