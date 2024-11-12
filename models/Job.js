import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/conn.js';
import Ngo from './Ngo.js';

const Job = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    ngoid: { 
        type: DataTypes.INTEGER,
        references: {
            model: Ngo,
            key: 'id'
        },
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    remote: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    addressstreet: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
        allowNull: true,
    },
    vacancies: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'Job',
    timestamps: true,
});

Job.belongsTo(Ngo, { foreignKey: 'ngoid' });
Ngo.hasMany(Job, { foreignKey: 'ngoid' });

export default Job;
