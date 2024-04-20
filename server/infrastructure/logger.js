const pino = require('pino');
const path = require('path');
const fs = require('fs');
const setupLogingDirAndFile = () => {
    fs.existsSync(path.resolve(__dirname, '../../', 'logs')) || fs.mkdirSync(path.resolve(__dirname, '../../', 'logs'));
    fs.existsSync(path.resolve(__dirname, '../../', 'logs', 'server.log')) ||
        fs.writeFileSync(path.resolve(__dirname, '../../', 'logs', 'server.log'), '');
    return path.resolve(__dirname, '../../', 'logs', 'server.log');
};

module.exports = pino({
    level: process.env.REACT_APP_PINO_LOG_LEVEL || 'info',
    timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                options: { destination: 1, colorize: true },
            },
            {
                target: 'pino/file',
                options: { destination: setupLogingDirAndFile(), append: true, mkdir: false },
            },
        ],
    },
});
