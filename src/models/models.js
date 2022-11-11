import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
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

export {User, Hardware};