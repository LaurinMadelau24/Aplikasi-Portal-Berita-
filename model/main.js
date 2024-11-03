const Sequelize = require('sequelize');
const dbConfig = require('../config/dbConfig');

// Mengambil variabel lingkungan dari .env
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        min: dbConfig.pool.min,
        max: dbConfig.pool.max,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.News = require('./News')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);
db.Category = require('./Category')(sequelize, Sequelize);

// Definisikan Relasi
db.News.belongsTo(db.Category, { foreignKey: 'category_id', as: 'category' });

module.exports = db;
