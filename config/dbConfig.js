// config/dbConfig.js
module.exports = {
    host: process.env.DB_HOST, // Dapatkan dari environment variable
    user: process.env.DB_USERNAME, // Dapatkan dari environment variable
    password: process.env.DB_PASSWORD, // Dapatkan dari environment variable
    database: process.env.DB_DBNAME, // Dapatkan dari environment variable
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000,
    }
}
