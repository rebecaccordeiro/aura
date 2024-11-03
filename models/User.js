import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/conn.js';

const User = sequelize.define('User', {
    UserId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    FirstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    LastName: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    Email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    Birthday: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    City: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    PhoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
}, {
    tableName: 'User',
    timestamps: true,
});

export default User;
