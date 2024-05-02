const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('./infrastructure/logger');
const pinoHTTP = require('pino-http');
const swaggerUI = require('swagger-ui-express');
const doc = require('./infrastructure/swagger-output.json');
const { mongoUtils } = require('./infrastructure/mongoDBConnection');
const { router } = require('./routes/apiRoutes.js');
const Redis = require('ioredis');
require('./models');
const API_PREFIX = '/api';
const setupServer = async () => {
    const app = express();
    app.use(
        pinoHTTP({
            logger,
        }),
    );
    app.use(cookieParser());
    app.use('/swagger', swaggerUI.serve, swaggerUI.setup(doc, { explorer: true }));
    app.use(helmet.ieNoOpen());
    app.use(helmet.xssFilter());
    app.use(helmet.hidePoweredBy());
    app.use(compression());
    app.use(express.json({ limit: '50mb', extended: true }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const redisClient = new Redis({
        port: process.env.REACT_APP_REDIS_PORT, // Redis port
        host: process.env.REACT_APP_REDIS_HOST, // Redis host
        db: 0, // Defaults to 0
    });

    await mongoUtils.connectMongoDbWithRetry();

    // TODO add here populating redis with the active configs

    app.use(function (req, res, next) {
        req.redis = redisClient;
        next();
    });

    const apiLimiter = rateLimit({
        windowMs: 10 * 60 * 1000, // Window of 10 minutes.
        max: 200, // Limit each IP to 200 requests per `window` (here, per 10 minutes).
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers.
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    });

    app.get('*/hc', apiLimiter, (req, res) => {
        res.send(JSON.stringify({}, null, '\t'));
    });

    if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
        const webpackMiddleware = require('webpack-dev-middleware');
        const webpack = require('webpack');
        const webpackConfig = require('../webpack.config.js');
        const compiler = webpack(webpackConfig);
        app.use(
            webpackMiddleware(compiler, {
                publicPath: webpackConfig.output.publicPath,
                writeToDisk: true,
            }),
        );
        app.use(
            require('webpack-hot-middleware')(compiler, {
                log: false,
                path: '/__webpack_hmr',
                heartbeat: 5 * 1000,
                hot: true,
            }),
        );
        app.use(express.static(path.join(__dirname, '../', 'dev')));
        app.get(/^\/(?!api\/).*/, function (req, res) {
            res.sendFile(path.join(__dirname, '../', 'dev', 'index.html'));
        });
    } else {
        app.use(express.static(path.join(__dirname, 'build')));
        app.get(/^\/(?!api\/).*/, function (req, res) {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
    }
    app.use(`${API_PREFIX}`, router);

    // const errorHandler = (err, req, res, next) => {
    //     if (process.env.REACT_APP_ENVIRONMENT === 'production') {
    //         res.status(err.status || 500);
    //         res.render('error', {
    //             message: err.message,
    //             error: {},
    //         });
    //     } else {
    //         res.status(err.status || 500);
    //         res.render('error', {
    //             message: err.message,
    //             error: err,
    //         });
    //         next();
    //     }
    // };
    // app.use(errorHandler);
    return app;
};
module.exports = { setupServer };
