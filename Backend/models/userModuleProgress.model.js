// Backend/models/userModuleProgress.model.js

module.exports = {
  tableName: 'user_module_progress',
  columns: {
    userId: 'user_id',
    chapterKey: 'chapter_key',
    moduleKey: 'module_key',
    studyCompleted: 'study_completed',
    exerciseCompleted: 'exercise_completed',
    assignmentCompleted: 'assignment_completed',
    codingCompleted: 'coding_completed',
    moduleCompleted: 'module_completed'
  }
};