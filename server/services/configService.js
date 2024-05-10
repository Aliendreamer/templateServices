/* eslint-disable max-statements */
/* eslint-disable react-func/max-lines-per-function */
const mongoose = require("mongoose");
const changesets = require("diff-json");
const logger = require("../infrastructure/logger");
const { REDIS_KEYS, REDIS_KEYS_SUFFIX, ENVIRONMENTS, OPCOS } = require("../infrastructure/constants");
class ConfigService {
    // eslint-disable-next-line space-before-function-paren
    constructor(redis) {
        this.redis = redis;
        this.Config = mongoose.model("config");
        this.Modification = mongoose.model("modification");
    }

    returnConfig = async (id) => await this.Config.findById(id).populate("modifications").exec();

    returnConfigs = async (opco, env, deviceType) =>
        await this.Config.find({ opco: opco.toUpperCase(), environment: env, deviceType }).populate("modifications").exec();

    returnActiveConfig = async (opco, deviceType, env) => {
        const key = REDIS_KEYS[`${opco.toUpperCase()}_${deviceType.toUpperCase()}_${env.toUpperCase()}_${REDIS_KEYS_SUFFIX}`];
        const cashed = await this.redis.exists(key);
        if (cashed) {
            return JSON.parse(await this.redis.get(key));
        }
        const config = await this.Config.findOne({ opco, environment: env, deviceType, active: true }).lean().exec();
        await this.redis.set(key, JSON.stringify(config.config));
        return config.config;
    };

    activateConfig = async (id) => {
        const config = await this.Config.findOneAndUpdate({ _id: id }, { active: true }, { new: true, lean: true }).exec();
        const key =
            REDIS_KEYS[
                `${config.opco.toUpperCase()}_${config.deviceType.toUpperCase()}_${config.environment.toUpperCase()}_${REDIS_KEYS_SUFFIX}`
            ];
        await this.redis.set(key, JSON.stringify(config.config));
        return true;
    };

    createEmptyConfig = async (opco, deviceType, env, user) => {
        const largestVersion = await this.Config.findOne(
            { opco: opco.toUpperCase(), deviceType, environment: env },
            { _id: 0, version: 1 },
            { sort: { version: -1 } },
        )
            .lean()
            .exec();
        const emptyConfig = {};
        emptyConfig.version = largestVersion.version + 1;
        emptyConfig.author = user.name;
        emptyConfig.active = false;
        emptyConfig.title = "Generic empty Config";
        emptyConfig.config = {};
        emptyConfig.deviceType = deviceType;
        emptyConfig.environment = env;
        emptyConfig.opco = opco.toUpperCase();
        emptyConfig.date = new Date().toISOString();
        await this.Config.create(emptyConfig);
        return true;
    };

    createConfig = async (opco, deviceType, env, user) => {
        const configToCopy = await this.Config.findOne({ opco: opco.toUpperCase(), deviceType, environment: env, active: true }).exec();
        const largestVersion = await this.Config.findOne(
            { opco: opco.toUpperCase(), deviceType, environment: env },
            { _id: 0, version: 1 },
            { sort: { version: -1 } },
        )
            .lean()
            .exec();
        const clonedConfig = configToCopy.toObject();
        delete clonedConfig._id;
        clonedConfig.version = largestVersion.version + 1;
        clonedConfig.author = user.name;
        clonedConfig.title = "Generic created by example Config";
        clonedConfig.active = false;
        clonedConfig.opco = opco.toUpperCase();
        clonedConfig.date = new Date().toISOString();
        await this.Config.create(clonedConfig);
        return true;
    };

    copyConfig = async (id, user) => {
        const configToCopy = await this.Config.findById(id).exec();
        const largestVersion = await this.Config.findOne(
            { opco: configToCopy.opco.toUpperCase(), deviceType: configToCopy.deviceType, environment: configToCopy.environment },
            { _id: 0, version: 1 },
            { sort: { version: -1 } },
        )
            .lean()
            .exec();
        const clonedItem = configToCopy.toObject();
        delete clonedItem._id;
        clonedItem.author = user.name;
        clonedConfig.title = "Generic copied Config";
        clonedItem.active = false;
        clonedItem.opco = opco.toUpperCase();
        clonedItem.date = new Date().toISOString();
        clonedItem.version = largestVersion.version + 1;
        await this.Config.create(clonedItem);
        return true;
    };

    deleteConfig = async (id) => {
        const config = await this.Config.findById(id).exec();
        if (config.active) {
            throw new Error("409");
        }
        await this.Config.findByIdAndDelete(id).exec();
        return true;
    };

    updateConfig = async (id, config, user) => {
        const configuration = await this.Config.findById(id).exec();
        const diff = changesets.diff(configuration.config, config);
        const date = new Date().toISOString();
        const modification = await this.Modification.create({
            configId: id,
            difference: diff,
            author: user.name,
            date,
        });

        const configReplace = configuration.toObject();
        configReplace.config = config;
        configReplace.author = user.name;
        configReplace.date = date;
        configReplace.modifications.push(modification._id);
        await this.Config.findOneAndReplace({ _id: id }, configReplace).exec();

        if (!configuration.active) {
            return true;
        }
        const key =
            REDIS_KEYS[
                `${updatedConfig.opco.toUpperCase()}_${updatedConfig.deviceType.toUpperCase()}_${updatedConfig.environment.toUpperCase()}_${REDIS_KEYS_SUFFIX}`
            ];
        this.redis.set(key, JSON.stringify(config));

        return true;
    };

    addPropertytoConfigs = async (deviceType, config, user, updateProduction) => {
        // we are gonna use Bulgaria int as base for the new properties and differences
        const baseConfig = await this.Config.findOne({
            opco: OPCOS.BULGARIA,
            environment: ENVIRONMENTS.integration,
            deviceType,
            active: true,
        }).exec();
        const diff = changesets.diff(baseConfig.config, config);
        const configs = updateProduction
            ? await this.Config.find({ deviceType }).exec()
            : await this.Config.find({ deviceType, environment: { $ne: ENVIRONMENTS.PRODUCTION } })
                  .lean()
                  .exec();
        for (const envConfig of configs) {
            const modification = await this.Modification.create({
                configId: envConfig.id,
                difference: diff,
                author: user.name,
                date,
            });
            const configReplace = envConfig.toObject();
            const newConfig = configReplace.config;
            for (const difference of diff) {
                if (!Object.prototype.hasOwnProperty.call(difference, "changes")) {
                    break;
                }
                // this is content_config  always
                const outsideKey = difference.key;
                for (const nestedDiff of difference.changes) {
                    // this is the inner object either app_config or api_config ect
                    const nestedKey = nestedDiff.key;
                    for (const innerNestedDiff of nestedDiff.changes) {
                        // this is the actual nested object where the property will be
                        // added changed or removed where the actual change is.
                        const innerNestedDiffKey = innerNestedDiff.key;
                        for (const nestedChanges of innerNestedDiffKey.changes) {
                            // this is the actual nested object where the property will be
                            // added changed or removed where the actual change is.
                            // for example miscellanious or pin_settings ect.
                            const innerNestedDiffKey = nestedChanges.key;
                            if (!Object.prototype.hasOwnProperty.call(nestedChanges, "changes")) {
                                // something went wrong and there is no actual changes
                                continue;
                            }
                            for (const positionOfChange of nestedChanges.changes) {
                                // the actual changes done
                                const positionKey = positionOfChange.key;
                                if (!nestedChanges.Object.prototype.hasOwnProperty.call(nestedChanges, "changes")) {
                                    // something went wrongCh and there is no actual changes
                                    continue;
                                }
                                if (Object.prototype.hasOwnProperty.call(nestedChanges, "embededKey")) {
                                    // we know that the change is in some array, but the library
                                    // list the changes separately for example deleting a settings item will create
                                    // 11 changes as the array will be different.
                                    // we can just swap the arrays; and to continue with the changes
                                    newConfig[outsideKey][nestedKey][innerNestedDiffKey][positionKey] =
                                        config[outsideKey][nestedKey][innerNestedDiffKey][positionKey];
                                    continue;
                                }
                                switch (positionOfChange.type) {
                                    case "add":
                                    case "update":
                                        logger.info(
                                            `Setting ${newConfig[outsideKey][nestedKey][innerNestedDiffKey][positionKey]} to ${positionOfChange.value}`,
                                        );
                                        newConfig[outsideKey][nestedKey][innerNestedDiffKey][positionKey] = positionOfChange.value;
                                        break;
                                    case "remove":
                                        logger.info(`Deleting ${newConfig[outsideKey][nestedKey][innerNestedDiffKey][positionKey]}`);
                                        delete newConfig[outsideKey][nestedKey][innerNestedDiffKey][positionKey];
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    }
                }
            }

            configReplace.config = newConfig;
            configReplace.author = user.name;
            configReplace.date = date;
            configReplace.modifications.push(modification._id);
            await this.Config.findOneAndReplace({ _id: id }, configReplace).exec();
            if (config.active) {
                const key =
                    REDIS_KEYS[
                        `${config.opco.toUpperCase()}_${config.deviceType.toUpperCase()}_${config.environment.toUpperCase()}_${REDIS_KEYS_SUFFIX}`
                    ];
                this.redis.set(key, JSON.stringify(newConfig));
            }
        }
    };
}

module.exports = ConfigService;
