import 'dotenv/config'
import express from "express";
import sequelize from './db.js';
import * as models from "./models/models.js";
import cors from "cors";
import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);

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