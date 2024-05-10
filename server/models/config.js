const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// https://www.askasya.com/post/trackversions/
const ConfigSchema = new Schema(
    {
        config: Object,
        author: String,
        date: String,
        opco: String,
        title: String,
        version: Number,
        deviceType: String,
        environment: String,
        active: Boolean,
        modifications: [
            {
                type: Schema.Types.ObjectId,
                ref: "modification",
            },
        ],
    },
    { usePushEach: true, minimize: false, versionKey: false },
);

ConfigSchema.index({ version: 1 });
ConfigSchema.index({ environment: 1 });
ConfigSchema.index({ opco: 1 });
ConfigSchema.index({ deviceType: 1 });
ConfigSchema.set("toJSON", { getters: true, virtuals: false, versionKey: false });
mongoose.model("config", ConfigSchema);
