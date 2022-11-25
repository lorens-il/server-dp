import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const WorkerIdent = sequelize.define('WorkerIdent', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'service engineer' },
});

const Workers = sequelize.define('Workers', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fio: { type: DataTypes.STRING, allowNull: false},
    phone: { type: DataTypes.INTEGER, allowNull: false },
    mail: { type: DataTypes.STRING, allowNull: false },
    post: { type: DataTypes.STRING, allowNull: false },
});

const Hardware = sequelize.define('Hardware', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
});

const Сontract = sequelize.define('Сontract', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.TEXT, allowNull: false },
});

const TrainingMaterial = sequelize.define('TrainingMaterial', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.TEXT, allowNull: false },
});

const Date = sequelize.define('Date', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE, allowNull: false },
});

Workers.hasMany(Сontract, {onDelete: 'CASCADE'});
Сontract.belongsTo(Workers);

Workers.hasMany(Hardware, {onDelete: 'CASCADE'});
Hardware.belongsTo(Workers);

Сontract.hasOne(Date, {onDelete: 'CASCADE'});
Date.belongsTo(Сontract);

Hardware.hasOne(Date, {onDelete: 'CASCADE'});
Date.belongsTo(Hardware);

TrainingMaterial.hasOne(Date, {onDelete: 'CASCADE'});
Date.belongsTo(TrainingMaterial);

export { 
        WorkerIdent, 
        Hardware,
        Workers, 
        TrainingMaterial, 
        Сontract, 
        Date 
};