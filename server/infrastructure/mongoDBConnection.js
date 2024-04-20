const mongoose = require('mongoose');
const logger = require('./logger');
const mongoUtils = {};
mongoUtils.connectMongoDbWithRetry = async function () {
    try {
        const mongoUri = process.env.REACT_APP_MONGODB_URI;
        const retryTimeoutInSecs = 5;

        logger.info(`Connecting to MongoDB database '${mongoUri}' with retry.`);
        mongoose.connection.on('open', () => {
            logger.info(`Connected to MongoDB database '${mongoUri}'.`);
        });
        mongoose.connection.on('reconnect', () => {
            logger.info(`Reconnected to MongoDB database '${mongoUri}'.`);
        });
        mongoose.connection.on('error', (error) => {
            logger.error(`Error connecting to MongoDB database '${mongoUri}' (error: '${error}').`);
            logger.error(`Connection to MongoDB database '${mongoUri}' unsuccessful, retrying after ${retryTimeoutInSecs} second(s).`);
            setTimeout(mongoUtils.connectMongoDbWithRetry, retryTimeoutInSecs * 1000);
        });
        mongoose.connection.on('disconnected', () => {
            logger.warn(`Disconnected from MongoDB database '${mongoUri}'.`);
        });
        return mongoose.connect(mongoUri, {
            authSource: 'admin',
            minPoolSize: 0,
            maxPoolSize: 100,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 30000,
            family: 4,
            bufferCommands: false,
            autoIndex: true,
            heartbeatFrequencyMS: 10000,
            connectTimeoutMS: 5000,
            maxIdleTimeMS: 15000,
        });
    } catch (error) {}
};

module.exports = { mongoUtils };
