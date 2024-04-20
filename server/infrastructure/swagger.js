const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
// https://blog.logrocket.com/documenting-express-js-api-swagger/#benefits-using-swagger
// https://swagger-autogen.github.io/docs/openapi-3/schemas-and-components this documentation we use
// https://app.swaggerhub.com/apis/POEditor/v_2/1.0.4 poe editor swagger we can use
const doc = {
    info: {
        title: 'Configuration service api',
        version: '0.0.1',
        description: 'Configuration service be endpoints',
        license: {
            name: 'MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'A1 BG',
            url: 'https://a1.bg',
            email: 'SmartTVBG@a1.bg',
        },
    },
    definitions: {
        badResponse: false,
        operationSuccess: true,
        unauthorized: { error: 'unauthorized' },
        keycloak: { error: 'failed to get public key to verify token' },
    },
    components: {
        schemas: {
            opco: {
                '@enum': ['A1BG', 'A1HR', 'A1AT', 'A1MK', 'A1AT', 'A1Sl'],
            },
            environment: {
                '@enum': ['development', 'integration', 'production'],
            },
            devicetype: {
                '@enum': ['smarttv', 'androidtv'],
            },
            Config: {
                $id: 'xx',
                $content: {
                    api_config: {
                        routes: {
                            api: 'http://localhost:5000',
                        },
                        castlabs_settings: {
                            autoplay: false,
                        },
                    },
                    contentmarkers: {
                        blue: 'xx',
                    },
                },
                $date: new Date().toISOString(),
                $opco: 'A1_BG',
                $version: 1,
                $deviceType: 'smarttv',
                $environment: 'development',
                $active: true,
            },
        },
        examples: {
            configExample: {
                value: {
                    id: 'xxxx',
                    version: 1,
                    opco: 'A1_BG',
                    deviceType: 'smarttv',
                    environment: 'development',
                    active: true,
                    date: new Date().toISOString(),
                    content: {
                        api_config: {
                            routes: {
                                api: 'http://localhost:5000',
                            },
                            castlabs_settings: {
                                autoplay: false,
                            },
                        },
                        contentmarkers: {
                            blue: 'xx',
                        },
                    },
                },
                summary: 'Example of a small configuration object',
            },
        },
    },
    servers: [
        {
            url: 'http://localhost:5000/api',
            description: 'Local development server',
        },
    ],
};

const outputFile = './swagger-output.json';
const routes = ['../routes/*.js'];
swaggerAutogen(outputFile, routes, doc);
