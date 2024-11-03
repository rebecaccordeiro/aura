import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/conn.js';
import Ngo from './Ngo.js';

const Job = sequelize.define('Job', {
    JobId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    NgoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Ngo,
            key: 'NgoId'
        },
        allowNull: false,
    },
    Title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Remote: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    AddressStreet: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
        allowNull: true,
    },
    Vacancies: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Description: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    },
    Active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'Job',
    timestamps: true,
});

Job.belongsTo(Ngo, { foreignKey: 'NgoId' });

export default Job;