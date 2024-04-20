const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const ConfigService = require('../services/configService.js');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    // #swagger.tags = ['X']
    // #swagger.deprecated = false
    // #swagger.produces = ['application/json']
    // #swagger.summary = 'Retrieve the list of configurations for a specific opco, environment, and device type'
    // #swagger.description = 'Returns full list of configurations for a specific opco, environment, and device type. For example, will return all configurations for opco "A1BG", environment "development", and device type "smarttv".'
    // #swagger.parameters['opco'] = { description: 'The opco to filter configurations by' }
    // #swagger.parameters['env'] = { description: 'The environment to filter configurations by' }
    // #swagger.parameters['devicetype'] = { description: 'The devicetype to filter configurations by' }
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /* #swagger.responses[200] = {
            description: "Full list of configurations for a specific opco, environment, and device type",
            content: {
                "application/json": {
                        schema:{
							type: "array",
							items: {
                                $ref: "#/components/schemas/Config"
							}
                    }
                }
            }
        }
    */
    /* #swagger.responses[400] = {
            description: "Request can't be fullfilled due to missing information or invalid parameters",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
    */
    /* #swagger.responses[500] = {
            description: "Request can't be fullfilled due to unexpected server error",
            content: {
                "application/json": {
                        schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
    */
    const { x } = req.query;
    try {
        const configs = await new ConfigService().returnConfigs(x);
        if (configs.length > 0) {
            return res.status(200).send(configs);
        }
        return res.status(400).send(false);
    } catch (error) {
        return res.status(500).send(false);
    }
});



module.exports = { router };
