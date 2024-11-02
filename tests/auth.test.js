const request = require('supertest');
const app = require('../app_test');
const { password } = require('../config/dbConfig');

let elementId;
const token = 'qhriushfkusn';

/// Start test Auth
describe('AUTH', () => {
  test('Register User', (done) => {
    request(app)
      .post('/api/auth/register')
      .expect('Content-Type', /json/)
      .send({
        email: 'test2@gmail.com',
        password: '123456789',
      })
      .expect(201)
      .expect((res) => {
        res.body.data.length = 2;
        res.body.data[0].email = 'test@gmail.com';
        res.body.data[0].password = '123456789';
        res.body.data[1].email = 'test2@gmail.com';
        res.body.data[1].password = '123456789';
      })
      .end((err, res) => {
        if (err) return done(err);
        elementId = res.body.data[1].id;
        return done();
      });
  });

  test('Login User', (done) => {
    request(app)
      .post('/api/auth/login')
      .expect('Content-Type', /json/)
      .send({
        email: 'test@gmail.com',
        password: '123456789',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message', 'Login Berhasil');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  
  test('Logout User', (done) => {
    request(app)
      .post('/api/auth/logout')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message', 'Logout Berhasil');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
/// End test Auth
/// Start test Category
describe('Category', () => {
  test('Find All Category', (done) => {
    request(app)
      .get('/api/category/')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveLength(1);
        expect(res.body.data[0]).toHaveProperty('category_name', 'Game');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test('Find One Category', (done) => {
    request(app)
      .get(`/api/category/${1}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveProperty('category_name', 'Game');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test('Create Category', (done) => {
    request(app)
      .post('/api/category/create')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .send({
        category_name: 'Politik',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.data).toHaveLength(2);
        expect(res.body.data[0]).toHaveProperty('category_name', 'Game');
        expect(res.body.data[1]).toHaveProperty('category_name', 'Politik');
      })
      .end((err, res) => {
        if (err) return done(err);
        elementId = res.body.data[1].id;
        return done();
      });
  });

  test('Update Category', (done) => {
    request(app)
      .put(`/api/category/update/${elementId}`)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .send({
        category_name: 'Hewan',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveLength(2);
        expect(res.body.data[0]).toHaveProperty('category_name', 'Game');

        expect(res.body.data[1]).toHaveProperty('id', elementId);
        expect(res.body.data[1]).toHaveProperty('category_name', 'Hewan');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test('DELETE Category', (done) => {
    request(app)
      .delete(`/api/category/delete/${elementId}`)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveLength(1);
        expect(res.body.data[0]).toHaveProperty('category_name', 'Game');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
/// End test Category
/// Start test News
describe('News', () => {
  test('Find All News', (done) => {
    request(app)
      .get('/api/news/')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveLength(1);
        expect(res.body.data[0]).toHaveProperty('title', 'MPL');
        expect(res.body.data[0]).toHaveProperty('content', 'RRQ VS EVOS');
        expect(res.body.data[0]).toHaveProperty('category_id', '1');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test('Find One News', (done) => {
    request(app)
      .get(`/api/news/${1}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveProperty('title', 'MPL');
        expect(res.body.data).toHaveProperty('content', 'RRQ VS EVOS');
        expect(res.body.data).toHaveProperty('category_id', '1');
        expect(res.body.include.data[0]).toHaveProperty('id', 1);
        expect(res.body.include.data[0]).toHaveProperty('category_name', 'Game');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test('Search News', (done) => {
    request(app)
      .post('/api/news/search')
      .expect('Content-Type', /json/)
      .send({
        keyword: 'MPL',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data[0]).toHaveProperty('title', 'MPL');
        expect(res.body.data[0]).toHaveProperty('content', 'RRQ VS EVOS');
        expect(res.body.data[0]).toHaveProperty('category_id', '1');

        expect(res.body.include.data[0]).toHaveProperty('id', 1);
        expect(res.body.include.data[0]).toHaveProperty('category_name', 'Game');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test('Create News', (done) => {
    request(app)
      .post('/api/news/create')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .send({
        title: 'Politik',
        content: 'Prabowo Presiden',
        category_id: '1',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.data).toHaveLength(2);
        expect(res.body.data[0]).toHaveProperty('title', 'MPL');
        expect(res.body.data[0]).toHaveProperty('content', 'RRQ VS EVOS');
        expect(res.body.data[0]).toHaveProperty('category_id', '1');

        expect(res.body.data[1]).toHaveProperty('title', 'Politik');
        expect(res.body.data[1]).toHaveProperty('content', 'Prabowo Presiden');
        expect(res.body.data[1]).toHaveProperty('category_id', '1');
      })
      .end((err, res) => {
        if (err) return done(err);
        elementId = res.body.data[1].id;
        return done();
      });
  });

  test('Update News', (done) => {
    request(app)
      .put(`/api/news/update/${elementId}`)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .send({
        title: 'Politik',
        content: 'Prabowo Presiden',
        category_id: '2',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveLength(2);
        expect(res.body.data[0]).toHaveProperty('title', 'MPL');
        expect(res.body.data[0]).toHaveProperty('content', 'RRQ VS EVOS');
        expect(res.body.data[0]).toHaveProperty('category_id', '1');

        expect(res.body.data[1]).toHaveProperty('title', 'Politik');
        expect(res.body.data[1]).toHaveProperty('content', 'Prabowo Presiden');
        expect(res.body.data[1]).toHaveProperty('category_id', '2');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  test('DELETE News', (done) => {
    request(app)
      .delete(`/api/news/delete/${elementId}`)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveLength(1);
        expect(res.body.data[0]).toHaveProperty('title', 'MPL');
        expect(res.body.data[0]).toHaveProperty('content', 'RRQ VS EVOS');
        expect(res.body.data[0]).toHaveProperty('category_id', '1');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
//end tes news
