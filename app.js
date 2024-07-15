require('dotenv').config({ path: `${__dirname}/.env` });
const express = require('express');
const {Sequelize} = require('sequelize');
const {Umzug, SequelizeStorage} = require('umzug');
const config = require('./config/database.js');
const db = require('./models');

const app = express();
const port = 3000;

const sequelize = new Sequelize(config.development);

const umzug = new Umzug({
    migrations: {glob: 'migrations/*.js'},
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({sequelize}),
    logger: {
        debug: (message) => console.log(message),
        info: (message) => console.info(message),
        warn: (message) => console.warn(message),
        error: (message) => console.error(message)
    },
    create: {
        folder: 'migrations',
    },
});

app.use(express.json());

app.post('/update-balance', async (req, res) => {
    const {userId, amount} = req.body;

    try {
        const user = await db.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const newBalance = user.balance + amount;
        if (newBalance < 0) {
            return res.status(400).json({error: 'Insufficient balance'});
        }

        await user.update({balance: newBalance});
        return res.json({newBalance});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
});

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        await umzug.up();
        console.log('Migrations have been executed successfully.');

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting the application:', error);
    }
};

void start();