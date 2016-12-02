import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## User APIs', () => {
  let user = {
    username: 'KK123',
    password: '1234567890'
  };

  let userEdit = {
    _id: '5841729e4d36283cec9f05c1',
    username: 'KK123',
    password: '1234567890'
  };

  describe('# POST /apiv1/users', () => {
    it('should create a new user', () => {
          request(app)
              .get(`/apiv1/users`)
              .set('content-type', 'application/json')
              .send(user)
              .end(function(err, res) {
                  expect(err).to.be.null;
                  expect(res.body.data.username).to.equal(user.username)
                  expect(res.body.password).to.equal(user.password)
                  expect(res).to.have.status(200);
              });;
    });
  });


  describe('# GET /apiv1/users/:userId', () => {
    it('should get user details', async (done) => {

      try {
          var res = await request(app)
                            .get(`/apiv1/users/${userEdit._id}`)
                            .set('content-type', 'application/json');
          //console.log(res);
          expect(res.body.data.username).to.equal(userEdit.username);

          done();
      } catch(err) {
          done(err);
      }

      /*request(app)
        .get(`/apiv1/users/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.username).to.equal(user.username);
         // expect(res.body.password).to.equal(user.password);
          done();
        })
        .catch(done);*/
    });

    it('should report error with message - Not found, when user does not exists', (done) => {
      request(app)
        .get('/apiv1/users/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.equal(null);
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /apiv1/users/:userId', () => {
    it('should update user details', (done) => {
      userEdit.username = 'KK';
      userEdit.password = 'KK';
      request(app)
        .put(`/apiv1/users/5841729e4d36283cec9f05c1`)
        .send(userEdit)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.username).to.equal('KK');
        //  expect(res.body.password).to.equal(user.password);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /apiv1/users/', () => {
    it('should get all users', (done) => {
      request(app)
        .get('/apiv1/users')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /apiv1/users/', () => {
    it('should delete user', (done) => {
      request(app)
        .delete(`/apiv1/users/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.username).to.equal('KK');
          expect(res.body.data.password).to.equal(user.password);
          done();
        })
        .catch(done);
    });
  });
});
