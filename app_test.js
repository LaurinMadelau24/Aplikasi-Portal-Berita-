const express = require('express');
const { password } = require('./config/dbConfig');
const Category = require('./model/Category');
const app = express();

app.use(express.json());

const fakeDB_User = [
  {
    id: 1,
    email: 'test@gmail.com',
    role: 'Admin',
    password: '123456789',
    token: 'qhriushfkusn',
  },
];
const fakeDB_category = [
  {
    id: 1,
    category_name: 'Game',
  },
];

const fakeDB_news = [
  {
    id: 1,
    title: 'MPL',
    content: 'RRQ VS EVOS',
    category_id: '1',
  },
];

//start test auth

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (token == null) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  const user = fakeDB_User.find((user) => user.token === token);

  if (!user) {
    return res.status(403).json({ message: 'Token tidak valid' });
  }

  req.user = user;
  req.userID = user.id;
  next();
}

app.post('/api/auth/register', (req, res) => {
  fakeDB_User.push({
    id: Math.floor(Math.random() * 100),
    email: req.body.email,
    password: req.body.password,
    role: 'Admin'
  });
  return res.status(201).json({ data: fakeDB_User }).send({ message: 'Akun Berhasil Dibuat' });
});

app.post('/api/auth/login', (req, res) => {
  const obj = fakeDB_User.find((el)=> el.email === req.body.email)

  if (!obj) {
    return res.status(404).json({ message: 'User tidak ditemukan' });
  }
  if ( obj.password === req.body.password){
    return res.status(200).json({ message: 'Login Berhasil' });
  }else{
    return res.status(401).json({ message: 'Login Gagal' });
  }
});

app.post('/api/auth/logout', authenticateToken, (req, res) => {
  const obj = fakeDB_User.find((el) => el.id === Number(req.userID));
  

  if (obj) {
    return res.status(200).json({ message: 'Logout Berhasil' });
  } else{
    return res.status(404).json({ message: 'User tidak ditemukan' });
  }
});
/// end tes auth

/// Start Test Category
app.get('/api/category/', (req, res) => {
  return res.status(200).json({ data: fakeDB_category });
});

app.get('/api/category/:id', (req, res) => {
  const obj = fakeDB_category.find((el) => el.id === Number(req.params.id));

  if (obj) {
    return res.status(200).json({ data: obj });
  } else {
    return res.status(404).json({ message: 'Category not found' });
  }
});

app.post('/api/category/create', authenticateToken, (req, res) => {
  fakeDB_category.push({
    id: Math.floor(Math.random() * 100),
    category_name: req.body.category_name,
  });
  return res.status(201).json({ data: fakeDB_category });
});

app.put('/api/category/update/:id', authenticateToken, (req, res) => {
  const obj = fakeDB_category.find((el) => el.id === Number(req.params.id));
  obj.category_name = req.body.category_name;
  if (obj) {
    return res.status(200).json({ data: fakeDB_category });
  } else {
    return res.status(404).json({ message: 'Category not found' });
  }
});

app.delete('/api/category/delete/:id', (req, res) => {
  const index = fakeDB_category.findIndex((el) => el.id === Number(req.params.id));
  fakeDB_category.splice(index, 1);
  return res.status(200).json({ data: fakeDB_category });
});

/// End Test Category

// start test news
app.get('/api/news/', (req, res) => {
  return res.status(200).json({ data: fakeDB_news, include: { data: fakeDB_category, as: 'category', attributes: ['id', 'category_name'] } });
});

app.get('/api/news/:id', (req, res) => {
  const obj = fakeDB_news.find((el) => el.id === Number(req.params.id));

  if (obj) {
    return res.status(200).json({ data: obj, include: { data: fakeDB_category, as: 'category', attributes: ['id', 'category_name'] } });
  } else {
    return res.status(404).json({ message: 'News not found' });
  }
});

app.post('/api/news/search', (req, res) => {
  const keyword = req.body.keyword.toLowerCase();
  const results = fakeDB_news.filter((el) => el.title.toLowerCase().includes(keyword) || el.content.toLowerCase().includes(keyword));

  if (results.length > 0) {
    return res.status(200).json({ data: results, include: { data: fakeDB_category, as: 'category', attributes: ['id', 'category_name'] } });
  } else {
    return res.status(404).json({ message: 'No news found' });
  }
});
app.post('/api/news/create', authenticateToken, (req, res) => {
  fakeDB_news.push({
    id: Math.floor(Math.random() * 100),
    title: req.body.title,
    content: req.body.content,
    category_id: req.body.category_id,
  });
  return res.status(201).json({ data: fakeDB_news });
});

app.put('/api/news/update/:id', authenticateToken, (req, res) => {
  const obj = fakeDB_news.find((el) => el.id === Number(req.params.id));
  (obj.title = req.body.title), 
  (obj.content = req.body.content), 
  (obj.category_id = req.body.category_id);
  if (obj) {
    return res.status(200).json({ data: fakeDB_news });
  } else {
    return res.status(404).json({ message: 'Category not found' });
  }
});

app.delete('/api/news/delete/:id', (req, res) => {
  const index = fakeDB_news.findIndex((el) => el.id === Number(req.params.id));
  fakeDB_news.splice(index, 1);
  return res.status(200).json({ data: fakeDB_news });
});

//end test news

module.exports = app;
