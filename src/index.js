import 'dotenv/config'
import express from "express";
import {graphqlHTTP} from "express-graphql"
import schema from './schema/schema.js';
import sequelize from './db.js';
import * as models from "./models/models.js";
import cors from "cors";
import root from './controllers/controllers.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use("/api", graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}));

const startApp = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log("WORK!"));
    } catch (error) {
        console.log(error)
    }
}
startApp();