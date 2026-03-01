// Backend/models/index.js

const UserModuleProgress = require('./userModuleProgress.model');
const UserChapterProgress = require('./userChapterProgress.model');
const UserOverallProgress = require('./userOverallProgress.model');

module.exports = {
  UserModuleProgress,
  UserChapterProgress,
  UserOverallProgress
};