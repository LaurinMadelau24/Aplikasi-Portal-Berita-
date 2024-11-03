module.exports = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000,
    }
};