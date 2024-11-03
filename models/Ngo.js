import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/conn.js';

const Ngo = sequelize.define('Ngo', {
    NgoId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Cnpj: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    Email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    AddressStreet: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    AddressNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    AddressComplement: {
        type: DataTypes.STRING(55),
        allowNull: true,
    },
    ZipCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    City: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    PhoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
    }
}, {
    tableName: 'Ngo',
    timestamps: true,
});

export default Ngo;