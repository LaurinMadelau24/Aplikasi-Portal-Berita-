

module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define('News', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        // category_id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     references:{
        //         model: 'categories',
        //         key: 'id'
        //     },
        //     onDelete:"CASCADE",
        //     onUpdate:"CASCADE"
        //   },
    });

   

    return News;
}