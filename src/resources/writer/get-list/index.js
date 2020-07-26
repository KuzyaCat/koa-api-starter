const writerService = require('resources/writer/writer.service');
const validate = require('middlewares/validate');
const Joi = require('@hapi/joi');

const schema = Joi.object({
  pageNumber: Joi.number().integer().min(0),
  documentsInPage: Joi.number().integer().min(1).max(5),
  sortBy: Joi.string().valid('_id', 'createdOn', 'firstName', 'lastName'),
  sortOrder: Joi.string().valid('asc', 'desc'),
});

async function handler(ctx) {
  let {
    pageNumber,
    documentsInPage,
    sortBy,
    sortOrder,
  } = ctx.request.query;

  if (!sortBy) {
    sortBy = '_id';
  }
  const sortOrderInNumber = sortOrder === 'asc' ? 1 : -1;

  const writersList = (
    await writerService.find({}, {
      page: pageNumber,
      perPage: +documentsInPage,
      sort: { [sortBy]: sortOrderInNumber },
    })
  );

  const numberOfAllDocuments = await writerService.count();

  ctx.body = {
    data: writersList,
    meta: {
      numberOfAllDocuments,
    },
  }
}

module.exports.register = (router) => {
  router.get('/list', validate(schema), handler);
};
