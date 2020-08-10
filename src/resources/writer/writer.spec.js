const supertest = require('supertest');
const faker = require('faker');
const assert = require('assert');
const server = require('app');
const writerService = require('./writer.service');

const app = server.listen();
const writerRequest = supertest.agent(app);

const getWriterData = (rawData) => {
  const defaultWriterData = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.random.number(1, 120),
    books: [
      {
        title: 'Red Right Hand',
        genre: 'novel',
      },
      {
        title: 'Red Hat',
        genre: 'poem',
      },
    ],
  };

  return { ...defaultWriterData, ...rawData };
};

const putRequest = async (id, writerData) => {
  return writerRequest
    .put(`/writer/${id}`)
    .send(getWriterData(writerData));
};

const postRequest = async (writerData) => {
  return writerRequest
    .post('/writer')
    .send(getWriterData(writerData));
};

describe('/writer', async () => {
  let writerIdFromDB = '';
  const invalidWriterId = 'hahjhahahahaahhahahaha';

  beforeEach('Add writer data', async () => {
    const data = await writerService.create(getWriterData({}));
    writerIdFromDB = data._id;
  });

  afterEach('Remove all documents from database', async () => {
    await writerService.remove({});
  });

  it('POST: Should return 400', async () => {
    await postRequest({
      firstName: 2281337,
      lastName: 'Sanganious',
    }).expect(400);
  });

  it('POST: Should return 200', async () => {
    await postRequest({
      firstName: 'Alexander',
      lastName: 'Gavruk',
    })
      .expect(200)
      .then((res) => {
        assert(res.body._id, writerIdFromDB);
      });
  });

  it('GET: Should return 200 and valid writer data', async () => {
    await writerRequest
      .get(`/writer/${writerIdFromDB}`)
      .expect(200)
      .then((res) => {
        assert(res.body._id, writerIdFromDB);
      });
  });

  it('PUT: Should return 200 and valid writer data', async () => {
    await putRequest(writerIdFromDB, {
      firstName: 'Alexander',
      lastName: 'Gavruk',
    })
      .expect(200)
      .then((res) => {
        assert(res.body._id, writerIdFromDB);
      });
  });

  it('PUT: Should return 400 because of invalid id param', async () => {
    await putRequest(invalidWriterId, {
      firstName: 'Alexander',
      lastName: 'Gavruk',
    }).expect(400);
  });

  it('PUT: Should return 400 because of invalid writer data', async () => {
    await putRequest(writerIdFromDB, {
      firstName: 2281337,
      lastName: 'Sanganious',
    }).expect(400);
  });

  it('DELETE: Should return 200 and valid writer data', async () => {
    await writerRequest
      .delete(`/writer/${writerIdFromDB}`)
      .expect(200)
      .then((res) => {
        assert(res.body[0]._id, writerIdFromDB);
      });
  });

  it('DELETE: Should return 200 and empty data', async () => {
    await writerRequest
      .delete(`/writer/${invalidWriterId}`)
      .expect(200)
      .then((res) => {
        assert(res.body, []);
      });
  });
});
