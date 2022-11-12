import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Worker, Hardware, TrainingMaterial} from '../models/models.js';

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
};



const root = {
    addWorker: async ({input: {login, password, role}}) => {
        try {
            const check = await Worker.findOne({where: {login}});
            if (check) {
                throw new Error('Такой пользователь уже существует');
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const worker = await Worker.create({ login, password: hashPassword, role });
            const tokenJwt = generateToken(worker.getDataValue('id'),  role);
            return { token: tokenJwt };
        } catch (error) {
            return error
        }
    },
    getTrainingMaterial: async () => {
        return (await TrainingMaterial.findAndCountAll()).rows
        
    },
    getAllHardware: async () => {
        return (await Hardware.findAndCountAll()).rows
    }
}

export default root;