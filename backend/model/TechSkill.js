const mongoose = require('mongoose');

const techSkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tech skill name is required'],
        trim: true
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

techSkillSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('TechSkill', techSkillSchema);
