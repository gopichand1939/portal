// Backend/models/userChapterProgress.model.js

module.exports = {
  tableName: 'user_chapter_progress',
  columns: {
    userId: 'user_id',
    chapterKey: 'chapter_key',
    progressPercentage: 'progress_percentage'
  }
};