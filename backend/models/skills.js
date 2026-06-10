const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  level: { type: Number, default: 80 }
});

module.exports = mongoose.model('Skill', SkillSchema);