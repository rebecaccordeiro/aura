import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/conn.js';

const Ngo = sequelize.define('Ngo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    cnpj: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    addressstreet: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    addressnumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    addresscomplement: {
        type: DataTypes.STRING(55),
        allowNull: true,
    },
    zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
    tableName: 'Ngo',
    timestamps: true,
});

export default Ngo;