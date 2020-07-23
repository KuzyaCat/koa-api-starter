const writerService = require('resources/writer/writer.service');
const validate = require('middlewares/validate');
const Joi = require('@hapi/joi');

const schema = Joi.object({
  pageNumber: Joi.number().integer(),
  documentsInPage: Joi.number().integer().min(1).max(5),
  sortBy: Joi.string(),
  sortOrder: Joi.string(),
});

async function handler(ctx) {
  let {
    pageNumber,
    documentsInPage,
    sortBy,
    sortOrder,
  } = ctx.params;

  if (!sortBy) {
    sortBy = '_id';
  }
  const sortOrderInNumber = sortOrder === 'asc' ? 1 : -1;

  const writersList = (
    await writerService._collection.find({}, {
      sort: { [sortBy]: sortOrderInNumber },
      skip: pageNumber * documentsInPage - 1,
      limit: +documentsInPage,
    })
  );

  const count = await writerService.count();

  ctx.body = {
    data: writersList,
    meta: {
      numberOfAllDocuments: count,
    },
  }
}

module.exports.register = (router) => {
  router.get('/list/:pageNumber/:documentsInPage/:sortBy/:sortOrder', validate(schema), handler);
};
