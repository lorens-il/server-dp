import {buildSchema} from 'graphql';

const schema = buildSchema(`

    type Worker {
        id: ID
        login: String
        password: String
        role: String
    }

    type Hardware {
        id: ID
        name: String
        status: String
        date: String
        category: String
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
        login: String!
        password: String!
        role: String!
    } 

    input HardwareInput {
        id: ID
        login: String!
        password: String!
        role: String!
    } 

    type Query {
        getAllHardware: [Hardware]
        getTrainingMaterial: [TrainingMaterial]
    }

    type Mutation {
        addWorker(input: WorkerInput): Token
    }
`);

export default schema;