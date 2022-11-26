import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {WorkerIdent, Workers, Hardware, TrainingMaterial, Date} from '../models/models.js';

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

const validateId = (responseBd) => {
    if (!responseBd) {
        throw new Error('Такого оборудования не существует/Неправильный id');
    }
}
// сделать ограничение по ролям для cud
const root = {
    registration: async ({input: {login, password, role = 'service engineer', workerDate: {fio, phone, mail, post}}}) => {
        try {
            const check = await WorkerIdent.findOne({where: {login}});
            if (check) {
                throw new Error('Такой пользователь уже существует');
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const workerIdent = await WorkerIdent.create({ login, password: hashPassword, role });
            await Workers.create({ fio, phone, mail, post });
            const tokenJwt = generateToken(workerIdent.getDataValue('id'),  role);
            return { token: tokenJwt };
        } catch (error) {
            return await error
        }
    },
    login: async ({input: {login, password}}) => {
        try {
            const checkWorker = await WorkerIdent.findOne({where: {login}});
            if (!checkWorker) {
                throw new Error('Неверный логин или пароль');
            }
            let comparePassword = await bcrypt.compare(password, checkWorker.getDataValue("password"));
            if(!comparePassword) {
                throw new Error('Неверный логин или пароль');
            }
            const tokenJwt = generateToken(checkWorker.getDataValue('id'), checkWorker.getDataValue('role'));
            return {token: tokenJwt};
        } catch (error) {
            return await error
        }
    },
    addHardware: async ({input: {id, date, ...otherData}}) => { // WorkerId мб надо получать из localStorage
        const hardware = await Hardware.create({...otherData, WorkerId: id});
        await Date.create({HardwareId: hardware.getDataValue('id'), date});
        return await Hardware.findOne({where: {id: hardware.getDataValue('id')}, include: [{ model: Date}]})
    },
    getAllHardware: async () => {
        return (await Hardware.findAndCountAll({include: 
            [{
                model: Date
            }]
        })).rows;
    },
    updateHardware: async ({input: {date, ...otherData}}) => {
        const updHar = await Hardware.update(otherData, {where: {id: otherData.id}});
        await Date.update({date}, {where: {HardwareId: otherData.id}})
        validateId(updHar[0]);
        return await Hardware.findOne({
            where: {id: otherData.id},
            include: 
            [{
                model: Date
            }]
        });
    },
    deleteHardware: async ({id}) => {
        const check = await Hardware.findOne({where: {id}, include: 
            [{
                model: Date
            }]
        });
        await Date.destroy({where: {HardwareId: id}});
        const delHard = await Hardware.destroy({where: {id}});
        validateId(delHard);
        return check;
    },
    addTrainingMaterial: async ({input}) => {
        return await TrainingMaterial.create({...input});
    },
    getTrainingMaterial: async () => {
        return (await TrainingMaterial.findAndCountAll()).rows;
        
    },
    deleteTrainingMaterial: async ({input}) => {
        const check = await TrainingMaterial.findOne({where: {id: input.id}});
        const del = await TrainingMaterial.destroy({where: {id: input.id}});
        validateId(del);
        return check;
    }
}

export default root;