import express, { json } from 'express';
import dbconnet from '../db/config.js';
// import accountRouter from "../routes/account_route.js";

class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.dbconnection();
        // this.route();
    };


    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Server is running');
        });
    };

    async dbconnection () {
        await dbconnet();
    };
};

export default Server;