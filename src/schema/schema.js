import {buildSchema} from 'graphql';

const schema = buildSchema(`

    type Worker {
        id: ID
        login: String
        password: String
    }

    type Hardware {
        id: ID
        name: String
        status: String
        category: String
        Date: Date
        WorkerId: ID
    }

    type Date { 
        id: ID
        date: String
        ContractId: ID
        HardwareId: ID
        TrainingMaterialId: ID
    }

    type TrainingMaterial {
        id: ID
        title: String
        desc: String
    }

    type Token {
        token: String
    }

    input WorkerInput {
        id: ID
        login: String
        password: String
        role: String
        workerDate: WorkerDataInput
    } 

    input WorkerDataInput {
        id: ID
        fio: String!
        phone: Int!
        mail: String!
        post: String!
    } 

    input HardwareInput {
        id: ID!
        name: String!
        status: String!
        date: String!
        category: String!
    } 

    input TrainingMaterialInput {
        id: ID
        title: String
        desc: String
    }

    type Query {
        getAllHardware: [Hardware]
        getTrainingMaterial: [TrainingMaterial]
    }

    type Mutation {
        registration(input: WorkerInput): Token
        login(input: WorkerInput): Token
        addHardware(input: HardwareInput): Hardware
        updateHardware(input: HardwareInput): Hardware
        deleteHardware(id: ID): Hardware
        addTrainingMaterial(input: TrainingMaterialInput): TrainingMaterial
        deleteTrainingMaterial(input: TrainingMaterialInput): TrainingMaterial
    }
`);
export default schema;