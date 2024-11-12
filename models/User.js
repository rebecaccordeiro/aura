import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/conn.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    fname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    lname: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    phonenumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'User',
    timestamps: true,
});

export default User;
