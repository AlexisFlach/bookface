import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { IUser } from '../../interfaces/IUser';
import User from '../../models/User';

Chai.use(chaiHttp);
const expect = Chai.expect;

const user: IUser = new User({ username: 'Alexito', password: 'kaka' });

const createUser = () => {
  describe('Create user', () => {
    it('should create a user', () => {
      return Chai.request(app)
        .post('/api/users/')
        .send(user)
        .then((response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.username).to.equal(user.username);
        });
    });
  });
};

describe('create user', () => {
  createUser();
});
