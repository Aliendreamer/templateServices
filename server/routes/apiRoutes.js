const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const ConfigService = require("../services/configService.js");

router.use(authMiddleware);

router.get("/configs", async (req, res) => {
    // #swagger.tags = ['Config']
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
    const { opco, env, devicetype } = req.query;
    try {
        const configs = await new ConfigService(req.redis).returnConfigs(opco, env, devicetype);
        if (configs.length > 0) {
            return res.status(200).send(configs);
        }
        return res.status(400).send(false);
    } catch (error) {
        return res.status(500).send(false);
    }
});

router.get("/config/:id", async (req, res) => {
    // #swagger.tags = ['Config']
    // #swagger.deprecated = false
    // #swagger.produces = ['application/json']
    // #swagger.summary = 'Retrieve the a single unique configuration based on id'
    // #swagger.description = 'A unique configuration for a specific opco, environment, and device type. For example, will return the configuration for opco "A1BG", environment "development", and device type "smarttv" with id "xxx".'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /* #swagger.responses[200] = {
            description: "A unique configuration for a specific opco, environment, and device type",
            content: {
                "application/json": {
                        schema:{ $ref: "#/components/schemas/Config"}
                }
            }
        }
        #swagger.responses[400] = {
            description: "Request can't be fullfilled due to missing information or invalid parameters",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
		#swagger.responses[401] = {
            description: "Request can't be fullfilled due to unathorized access",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/unauthorized' }
                }
            }
        }
		#swagger.responses[403] = {
            description: "Request can't be fullfilled due to keyloak public key error",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/keycloak' }
                }
            }
        }
        #swagger.responses[500] = {
            description: "Request can't be fullfilled due to unexpected server error",
            content: {
                "application/json": {
                        schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
    */
    const { id } = req.params;
    try {
        const config = await new ConfigService(req.redis).returnConfig(id);
        if (config) {
            return res.status(200).send(config);
        }
        return res.status(400).send(false);
    } catch (error) {
        return res.status(500).send(false);
    }
});

router.put("/config/:id", async (req, res) => {
    // #swagger.tags = ['Config']
    // #swagger.deprecated = false
    // #swagger.produces = ['application/json']
    // #swagger.summary = 'Update the unique configuration based on the id'
    // #swagger.description = 'Put request to change the data stored in the configuration'
    // #swagger.parameters['id'] = { description: 'the unique configuration id to find and update the configuration' }
    // #swagger.parameters['config'] = { in:'body',required:true, description: 'the new updated json configuration object',schema:{ $ref: "#/components/schemas/Config"}}
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /* #swagger.responses[200] = {
            description: "A unique configuration for a specific opco, environment, and device type",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/operationSuccess' }
                }
            }
        }
        #swagger.responses[400] = {
            description: "Request can't be fullfilled due to missing information or invalid parameters",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
			#swagger.responses[401] = {
            description: "Request can't be fullfilled due to unathorized access",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/unauthorized' }
                }
            }
        }
		#swagger.responses[403] = {
            description: "Request can't be fullfilled due to keyloak public key error",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/keycloak' }
                }
            }
        }
        #swagger.responses[500] = {
            description: "Request can't be fullfilled due to unexpected server error",
            content: {
                "application/json": {
                        schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
    */

    try {
        const { id } = req.params;
        const { config } = req.body;
        const success = await new ConfigService(req.redis).updateConfig(id, config, req.user);
        const code = success ? 200 : 400;
        return res.status(code).send(success);
    } catch (error) {
        return res.status(500).send(false);
    }
});

router.post("/config/activate", async (req, res) => {
    // #swagger.tags = ['Config']
    // #swagger.deprecated = false
    // #swagger.produces = ['application/json']
    // #swagger.summary = 'Set to active the configuration for a specific opco, environment, and device type it targets'
    // #swagger.description = 'Changing the active status of the configuration to true and setup it ot return as active config for the unique combination of opco, environment, and device type it targets'
    // #swagger.parameters['id'] = { description: 'id of the config to activate',required:true, in:'query' }
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /* #swagger.responses[200] = {
            description: "A unique configuration for a specific opco, environment, and device type",
            content: {
                "application/json": {
                        schema: { $ref: '#/definitions/operationSuccess' }
                }
            }
        }
        #swagger.responses[400] = {
            description: "Request can't be fullfilled due to missing information or invalid parameters",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
		#swagger.responses[401] = {
            description: "Request can't be fullfilled due to unathorized access",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/unauthorized' }
                }
            }
        }
		#swagger.responses[403] = {
            description: "Request can't be fullfilled due to keyloak public key error",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/keycloak' }
                }
            }
        }
        #swagger.responses[500] = {
            description: "Request can't be fullfilled due to unexpected server error",
            content: {
                "application/json": {
                        schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
    */
    const { id } = req.query;
    try {
        const success = await new ConfigService(req.redis).activateConfig(id);
        const code = success ? 200 : 400;
        return res.status(code).send(success);
    } catch (error) {
        return res.status(500).send(false);
    }
});

router.post("/config/create", async (req, res) => {
    // #swagger.tags = ['Config']
    // #swagger.deprecated = false
    // #swagger.produces = ['application/json']
    // #swagger.summary = 'create new unique configuration for a specific opco, environment, and device type using the last active configuration template'
    // #swagger.description = 'A unique configuration for  a specific opco, environment, and device type. For example, will return the configuration for opco "A1BG", environment "development", and device type "smarttv" with id "xxx".'
    // #swagger.parameters['opco'] = { description: 'The opco to filter configurations by' }
    // #swagger.parameters['env'] = { description: 'The environment to filter configurations by' }
    // #swagger.parameters['devicetype'] = { description: 'The devicetype to filter configurations by' }
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /*
        #swagger.responses[200] = {
            description: "A unique configuration for a specific opco, environment, and device type",
            content: {
                "application/json": {
                        schema:{ $ref: "#/components/schemas/Config"}
                }
            }
        }
        #swagger.responses[400] = {
            description: "Request can't be fullfilled due to missing information or invalid parameters",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
        #swagger.responses[401] = {
            description: "Request can't be fullfilled due to unathorized access",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/unauthorized' }
                }
            }
        }
        #swagger.responses[403] = {
            description: "Request can't be fullfilled due to keyloak public key error",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/keycloak' }
                }
            }
        }
        #swagger.responses[500] = {
            description: "Request can't be fullfilled due to unexpected server error",
            content: {
                "application/json": {
                        schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
    */

    const { opco, devicetype, env } = req.query;
    try {
        const success = await new ConfigService(req.redis).createConfig(opco, devicetype, env, req.user);
        const code = success ? 200 : 400;
        return res.status(code).send(success);
    } catch (error) {
        return res.status(500).send(false);
    }
});

router.post("/config/copy/:id", async (req, res) => {
    // #swagger.tags = ['Config']
    // #swagger.deprecated = false
    // #swagger.produces = ['application/json']
    // #swagger.summary = 'Retrieve the a single unique configuration based on id'
    // #swagger.description = 'A unique configuration for a specific opco, environment, and device type. For example, will return the configuration for opco "A1BG", environment "development", and device type "smarttv" with id "xxx".'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /* #swagger.responses[200] = {
            description: "A unique configuration for a specific opco, environment, and device type",
            content: {
                "application/json": {
                        schema:{ $ref: "#/components/schemas/Config"}
                }
            }
        }
        #swagger.responses[400] = {
            description: "Request can't be fullfilled due to missing information or invalid parameters",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
		#swagger.responses[401] = {
            description: "Request can't be fullfilled due to unathorized access",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/unauthorized' }
                }
            }
        }
		#swagger.responses[403] = {
            description: "Request can't be fullfilled due to keyloak public key error",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/keycloak' }
                }
            }
        }
        #swagger.responses[500] = {
            description: "Request can't be fullfilled due to unexpected server error",
            content: {
                "application/json": {
                        schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
    */
    try {
        const { id } = req.params;
        const success = await new ConfigService(req.redis).copyConfig(id, req.user);
        const code = success ? 200 : 400;
        return res.status(code).send(success);
    } catch (error) {
        return res.status(500).send(false);
    }
});

router.post("/config/new/create", async (req, res) => {
    // #swagger.tags = ['Config']
    // #swagger.deprecated = false
    // #swagger.produces = ['application/json']
    // #swagger.summary = 'create new unique empty configuration for a specific opco, environment, and device type using the last active configuration template'
    // #swagger.description = 'A unique configuration for  a specific opco, environment, and device type. For example, will return the configuration for opco "A1BG", environment "development", and device type "smarttv" with id "xxx".'
    // #swagger.parameters['opco'] = { description: 'The opco to filter configurations by' }
    // #swagger.parameters['env'] = { description: 'The environment to filter configurations by' }
    // #swagger.parameters['devicetype'] = { description: 'The devicetype to filter configurations by' }
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /*
        #swagger.responses[200] = {
            description: "A unique configuration for a specific opco, environment, and device type",
            content: {
                "application/json": {
                        schema:{ $ref: "#/components/schemas/Config"}
                }
            }
        }
        #swagger.responses[400] = {
            description: "Request can't be fullfilled due to missing information or invalid parameters",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
        #swagger.responses[401] = {
            description: "Request can't be fullfilled due to unathorized access",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/unauthorized' }
                }
            }
        }
        #swagger.responses[403] = {
            description: "Request can't be fullfilled due to keyloak public key error",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/keycloak' }
                }
            }
        }
        #swagger.responses[500] = {
            description: "Request can't be fullfilled due to unexpected server error",
            content: {
                "application/json": {
                        schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
    */

    const { opco, devicetype, env } = req.query;
    try {
        const success = await new ConfigService(req.redis).createEmptyConfig(opco, devicetype, env, req.user);
        const code = success ? 200 : 400;
        return res.status(code).send(success);
    } catch (error) {
        return res.status(500).send(false);
    }
});

router.post("/config/delete", async (req, res) => {
    // #swagger.tags = ['Config']
    // #swagger.deprecated = false
    // #swagger.produces = ['application/json']
    // #swagger.summary = 'Retrieve the a single unique configuration for a specific opco, environment, and device type'
    // #swagger.description = 'A unique configuration for  a specific opco, environment, and device type. For example, will return the configuration for opco "A1BG", environment "development", and device type "smarttv" with id "xxx".'
    // #swagger.parameters['id'] = { description: 'The id to filter configurations by' }
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /* #swagger.responses[200] = {
            description: "successfully deleted the config",
            content: {
                "application/json": {
                        schema:{ $ref: "#/definitions/operationSuccess"}
                }
            }
        }
        #swagger.responses[400] = {
            description: "Request can't be fullfilled due to missing information or invalid parameters",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
		#swagger.responses[401] = {
            description: "Request can't be fullfilled due to unathorized access",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/unauthorized' }
                }
            }
        }
		#swagger.responses[403] = {
            description: "Request can't be fullfilled due to keyloak public key error",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/keycloak' }
                }
            }
        }
		#swagger.responses[409] = {
            description: "Request can't be fullfilled due because this is current active config",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
        #swagger.responses[500] = {
            description: "Request can't be fullfilled due to unexpected server error",
            content: {
                "application/json": {
                        schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
    */
    try {
        const { id } = req.query;
        const success = await new ConfigService(req.redis).deleteConfig(id);
        const code = success ? 200 : 400;
        return res.status(code).send(success);
    } catch (error) {
        if (error.message === "409") {
            return res.status(409).send(false);
        }
        return res.status(500).send(false);
    }
});

router.get("/opco/active", async (req, res) => {
    // #swagger.tags = ['Config']
    // #swagger.deprecated = false
    // #swagger.produces = ['application/json']
    // #swagger.summary = 'Retrieve the a single unique configuration active for a specific opco, environment, and device type'
    // #swagger.parameters['opco'] = { description: 'The opco to filter configurations by' }
    // #swagger.parameters['environment'] = { description: 'The environment to filter configurations by' }
    // #swagger.parameters['devicetype'] = { description: 'The devicetype to filter configurations by' }
    // #swagger.description = 'The current active configuration for the request parameters,For example, will return the configuration for opco "A1BG", environment "development", and device type "smarttv" with id "xxx".'
    /* #swagger.responses[200] = {
            description: "The active configuration for a specific opco, environment, and device type",
            content: {
                "application/json": {
                        schema:{ $ref: "#/components/schemas/Config"}
                }
            }
        }
        #swagger.responses[400] = {
            description: "Request can't be fullfilled due to missing information or invalid parameters",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
		#swagger.responses[401] = {
            description: "Request can't be fullfilled due to unathorized access",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/unauthorized' }
                }
            }
        }
		#swagger.responses[403] = {
            description: "Request can't be fullfilled due to keyloak public key error",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/keycloak' }
                }
            }
        }
        #swagger.responses[500] = {
            description: "Request can't be fullfilled due to unexpected server error",
            content: {
                "application/json": {
                        schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
    */
    try {
        const { opco, devicetype, environment } = req.query;
        const config = await new ConfigService(req.redis).returnActiveConfig(opco, devicetype, environment);
        if (config) {
            return res.status(200).send(config);
        }
        return res.status(400).send(false);
    } catch (error) {
        return res.status(500).send(false);
    }
});

router.get("/add/property", async (req, res) => {
    // #swagger.tags = ['Config']
    // #swagger.deprecated = false
    // #swagger.produces = ['application/json']
    // #swagger.summary = 'Retrieve the a single unique configuration active for a specific opco, environment, and device type'
    // #swagger.parameters['devicetype'] = { description: 'The devicetype to filter configurations by' }
    // #swagger.parameters['updateProduction'] = { description: 'Boolean value if the production env should be updated first' }
    // #swagger.parameters['config'] = { in:'body',required:true, description: 'the new updated json configuration object',schema:{ $ref: "#/components/schemas/Config"}}
    // #swagger.description = 'The current active configuration for the request parameters,For example, will return the configuration for opco "A1BG", environment "development", and device type "smarttv" with id "xxx".'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /* #swagger.responses[200] = {
            description: "The active configuration for a specific opco, environment, and device type",
            content: {
                "application/json": {
                        schema:{ $ref: "#/components/schemas/Config"}
                }
            }
        }
        #swagger.responses[400] = {
            description: "Request can't be fullfilled due to missing information or invalid parameters",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
        #swagger.responses[401] = {
            description: "Request can't be fullfilled due to unathorized access",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/unauthorized' }
                }
            }
        }
        #swagger.responses[403] = {
            description: "Request can't be fullfilled due to keyloak public key error",
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/keycloak' }
                }
            }
        }
        #swagger.responses[500] = {
            description: "Request can't be fullfilled due to unexpected server error",
            content: {
                "application/json": {
                        schema: { $ref: '#/definitions/badResponse' }
                }
            }
        }
    */
    try {
        const { devicetype, updateProduction } = req.query;
        const { config } = req.body;
        const success = await new ConfigService(req.redis).addPropertytoConfigs(devicetype, config, updateProduction);
        const code = success ? 200 : 400;
        return res.status(code).send(success);
    } catch (error) {
        return res.status(500).send(false);
    }
});

module.exports = { router };
