### JUNIOR BACKEND PRE-INTERVIEW TASK ###
API sederhana untuk aplikasi portal berita.

### FITUR
- Authentication akun (Admin)
- CRUD news categories (Admin)
- CRUD news (Admin)
- view news list (User)
- view news details (User)
- search/look for news (User)


### Tools yang digunakan
- express.js
- Sequelize (ORM)
- MySQL
- JWT
- Swagger
- Jest Supertest

### Solusi
# install
npm init -y
npm install express sequelize mysql2 nodemon body-parser dotenv
npm install jsonwebtoken
npm install swagger-ui-express
npm install --save-dev jest supertest

# Solusi
file .env => PORT = 3000, ACCESS_SECRET_KEY=abcderfihfahfa

config/dbconfig.js => Connect Database
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'tugas',
    dialect: 'mysql',

model/main.js => menghubungkan sequelize dengan Mysql
model/user.js => membuat tabel serta atribut
model/category.js => membuat tabel serta atribut
model/news.js => membuat tabel serta atribut

controller/Auth.js => mengatur logika pada tabel user
controller/category.js => mengatur logika pada tabel category
controller/news.js => mengatur logika pada tabel news

routes/category => mengatur rute category
routes/news => mengatur rute news
routes/user => mengatur rute user

middlewares/authJWT.js => untuk membuat token

index.js => sebagai server utama

## API
# AUTH
/api/auth/register => membuat akun
/api/auth/login => melakukan login
/api/auth/logout => logout akub
# Category
/api/category/ => liat semua category
/api/category/:id => liat detail category
/api/category/create => membuat category
/api/category/update/:id => mengperbarui category
/api/category/delete/:id => menghapus category
# News
/api/news/ => liat semua news
/api/news/:id => liat detail news
/api/news/search => mencari news
/api/news/create => membuat news
/api/news/update/:id => mengperbarui news
/api/news/delete/:id => menghapus news

## swagger
apidocs.json => definisi swagger
access => /api-docs/

## unit test (Jest Supertest)
app_test => file server yang digunakan untuk melakukan testing
tests/auth.test.js => file yang digunakan untuk pengujian terhadap API

npm test => untuk melakukan test

