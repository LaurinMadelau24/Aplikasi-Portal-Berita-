const News = require('./News');

module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('Category', {
        category_name:{
            type: Sequelize.STRING,
            allowNull: false   
        }
    });
    
    return Category;
}