const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User',{
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate:{
                isEmail:{
                    msg:'Enter a valid email.'
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            set(value){
                if(value.length < 8) throw ({
                        error:{message:'Password Should be more than 8 characters.'}
                    })
                this.setDataValue('password', bcrypt.hashSync(value, 10))
            }
        },
        role:{
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Admin'
        }
    });
    
    return User;
}