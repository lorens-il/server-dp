import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const Worker = sequelize.define('Worker', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, primaryKey: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'user' },
});

const Hardware = sequelize.define('Hardware', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false},
    status: { type: DataTypes.STRING, allowNull: false},
    date: { type: DataTypes.DATE, allowNull: false},
    category: { type: DataTypes.STRING, allowNull: false}
});

const TrainingMaterial = sequelize.define('TrainingMaterial', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false},
    desc: { type: DataTypes.TEXT, allowNull: false},
});

export {Worker, Hardware, TrainingMaterial};