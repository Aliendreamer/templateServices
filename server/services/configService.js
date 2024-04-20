const mongoose = require('mongoose');
class ConfigService {
    constructor() {
    }

    returnConfig = async (id) => await this.Config.findById(id).populate('modifications').exec();

}

module.exports = ConfigService;
