const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModificationSchema = new Schema(
    {
        difference: Object,
        author: String,
        date: String,
        configId: {
            type: Schema.Types.ObjectId,
            ref: 'config',
        },
    },
    { usePushEach: true, minimize: false, versionKey: false },
);

ModificationSchema.index({ date: 1 });
ModificationSchema.index({ author: 1 });
ModificationSchema.index({ configId: 1 });
ModificationSchema.set('toJSON', { getters: true, virtuals: false, versionKey: false });
mongoose.model('modification', ModificationSchema);
