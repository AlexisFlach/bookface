const { MongoClient } = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('bookface');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = { username: 'Johnny' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ username: 'Johnny' });
    expect(insertedUser).toEqual(mockUser);
  });
});