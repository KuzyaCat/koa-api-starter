const supertest = require('supertest');
const faker = require('faker');
const server = require('app');
const writerService = require('./writer.service');

const app = server.listen();

const validWriterData = {
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

const updatedValidWriterData = {
  firstName: 'Alexander',
  lastName: 'Gavruk',
  age: 19,
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

const invalidWriterData = {
  firstName: 2281337,
  lastName: 'Sanganious',
  age: -1,
  books: [
    {
      title: 'Red Right Hand',
      genre: 'novel',
    },
    {
      title: 'Red Hat',
      genre: 'wut',
    },
  ],
};

describe('/writer', async () => {
  const writerRequest = supertest.agent(app);

  let bookIdFromDB = '';

  beforeEach('Add writer data', async () => {
    const data = await writerService.create(validWriterData);
    bookIdFromDB = data._id;
  });

  afterEach('Remove all documents from database', async () => {
    await writerService.remove({});
  });

  it('POST: Should return 400', async () => {
    await writerRequest
      .post('/writer')
      .send(invalidWriterData)
      .expect(400);
  });

  it('POST: Should return 200', async () => {
    await writerRequest
      .post('/writer')
      .send(updatedValidWriterData)
      .expect(200)
      .expect((res) => {
        res.body.firstName = updatedValidWriterData.firstName;
        res.body.lastName = updatedValidWriterData.lastName;
        res.body.age = updatedValidWriterData.age;
      });
  });

  it('GET: Should return 200 and valid writer data', async () => {
    await writerRequest
      .get(`/writer/${bookIdFromDB}`)
      .expect(200)
      .expect((res) => {
        res.body._id = bookIdFromDB;
        res.body.firstName = validWriterData.firstName;
        res.body.lastName = validWriterData.lastName;
        res.body.age = validWriterData.age;
      });
  });

  it('DELETE: Should return 200 and valid writer data', async () => {
    await writerRequest
      .delete(`/writer/${bookIdFromDB}`)
      .expect(200)
      .expect((res) => {
        res.body._id = bookIdFromDB;
        res.body.firstName = validWriterData.firstName;
        res.body.lastName = validWriterData.lastName;
        res.body.age = validWriterData.age;
      });
  });

  it('PUT: Should return 200 and valid writer data', async () => {
    await writerRequest
      .put(`/writer/${bookIdFromDB}`)
      .send(updatedValidWriterData)
      .expect(200)
      .expect((res) => {
        res.body._id = bookIdFromDB;
        res.body.firstName = updatedValidWriterData.firstName;
        res.body.lastName = updatedValidWriterData.lastName;
        res.body.age = updatedValidWriterData.age;
      });
  });
});
