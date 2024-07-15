'use strict';
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {
    }

    User.init({
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10000
        }
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};