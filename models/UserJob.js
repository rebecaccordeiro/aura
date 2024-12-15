import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/conn.js';

const UserJob = sequelize.define('UserJob', {
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    jobid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'UserJob',
    timestamps: true,
});

export default UserJob;
