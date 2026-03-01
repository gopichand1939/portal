const db = require('../config/db');
const chapterConfig = require('../config/chapter.config');

const SUBJECT_TABLES = {
  aptitude: 'user_aptitude_progress',
  verbal: 'user_verbal_progress',
  reasoning: 'user_reasoning_progress',
  python: 'user_programming_progress'
};

const VALID_SUBJECTS = ['aptitude', 'verbal', 'reasoning', 'python'];

const CONTENT_COLUMN = {
  STUDY: 'study_completed',
  EXERCISE: 'exercise_completed',
  ASSIGNMENT: 'assignment_completed',
  CODING: 'coding_completed'
};

const MIN_CORRECT_REQUIRED = 7;

function getTableForSubject(subject) {
  return SUBJECT_TABLES[subject] || null;
}

/**
 * Chapter progress = (completed_modules / totalModulesFromConfig) * 100.
 * totalModules from chapter.config.js only. One completed module ≠ 100%.
 */
async function getSubjectOverallProgress(tableName, userId, subject) {
  const config = chapterConfig[subject];
  const totalModules = config && typeof config.totalModules === 'number' ? config.totalModules : 0;
  if (totalModules <= 0) return 0;

  const { rows } = await db.query(
    `SELECT COUNT(*) AS completed
     FROM ${tableName}
     WHERE user_id = $1 AND module_completed = true`,
    [userId]
  );
  const completed = Number(rows[0]?.completed) || 0;
  const progress = Math.round((completed / totalModules) * 100);
  return Math.min(100, Math.max(0, progress));
}

/**
 * POST – Mark content completed. Insert/update row, set booleans, set module_completed when qualified.
 * Idempotent. Never store percentages.
 */
const completeContent = async (req, res) => {
  const subject = req.params.subject;
  const { moduleKey, contentType, correctCount } = req.body;
  const userId = req.userId;

  if (!VALID_SUBJECTS.includes(subject)) {
    return res.status(400).json({ error: 'Invalid subject' });
  }
  if (!moduleKey || typeof moduleKey !== 'string') {
    return res.status(400).json({ error: 'moduleKey required' });
  }
  const column = CONTENT_COLUMN[contentType];
  if (!column) {
    return res.status(400).json({ error: 'Invalid contentType' });
  }

  const tableName = getTableForSubject(subject);
  if (!tableName) {
    return res.status(400).json({ error: 'Invalid subject' });
  }

  try {
    // Insert row if not exists. Tables have NOT NULL chapter_key; we set it to subject (no chapter logic).
    await db.query(
      `INSERT INTO ${tableName}
       (user_id, chapter_key, module_key, study_completed, exercise_completed, assignment_completed, coding_completed, module_completed)
       VALUES ($1, $2, $3, false, false, false, false, false)
       ON CONFLICT (user_id, module_key) DO NOTHING`,
      [userId, subject, moduleKey]
    );

    // STUDY → always set study_completed = true
    // EXERCISE / ASSIGNMENT / CODING → only if correctCount >= 7
    let shouldUpdate = false;
    if (contentType === 'STUDY') {
      shouldUpdate = true;
    } else if (typeof correctCount === 'number' && correctCount >= MIN_CORRECT_REQUIRED) {
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      await db.query(
        `UPDATE ${tableName}
         SET ${column} = true
         WHERE user_id = $1 AND module_key = $2`,
        [userId, moduleKey]
      );
    }

    // Check if module qualifies as completed. Coding required only when module has coding (per-module, not per-chapter).
    const moduleHasCoding = req.body.moduleHasCoding === true;
    const { rows: [row] } = await db.query(
      `SELECT study_completed, exercise_completed, assignment_completed, coding_completed
       FROM ${tableName}
       WHERE user_id = $1 AND module_key = $2`,
      [userId, moduleKey]
    );

    if (row) {
      const studyDone = row.study_completed === true;
      const exerciseDone = row.exercise_completed === true;
      const assignmentDone = row.assignment_completed === true;
      const codingDone = (subject === 'python' && moduleHasCoding) ? row.coding_completed === true : true;
      const moduleDone = studyDone && exerciseDone && assignmentDone && codingDone;

      if (moduleDone) {
        await db.query(
          `UPDATE ${tableName}
           SET module_completed = true
           WHERE user_id = $1 AND module_key = $2`,
          [userId, moduleKey]
        );
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error('completeContent error:', err);
    res.status(500).json({ error: 'Failed to update progress' });
  }
};

/**
 * GET – Subject overall progress. Returns { subject, progress }.
 */
const getSubjectOverall = async (req, res) => {
  const subject = req.params.subject;
  const userId = req.userId;

  if (!VALID_SUBJECTS.includes(subject)) {
    return res.status(400).json({ error: 'Invalid subject' });
  }

  const tableName = getTableForSubject(subject);
  if (!tableName) {
    return res.status(400).json({ error: 'Invalid subject' });
  }

  try {
    const progress = await getSubjectOverallProgress(tableName, userId, subject);
    res.set('Cache-Control', 'no-store');
    res.json({ subject, progress });
  } catch (err) {
    console.error('getSubjectOverall error:', err);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

/**
 * GET – Dashboard combined progress. Returns { aptitude, verbal, reasoning, python }.
 */
const getDashboardOverall = async (req, res) => {
  const userId = req.userId;

  try {
    const [aptitude, verbal, reasoning, python] = await Promise.all([
      getSubjectOverallProgress(SUBJECT_TABLES.aptitude, userId, 'aptitude'),
      getSubjectOverallProgress(SUBJECT_TABLES.verbal, userId, 'verbal'),
      getSubjectOverallProgress(SUBJECT_TABLES.reasoning, userId, 'reasoning'),
      getSubjectOverallProgress(SUBJECT_TABLES.python, userId, 'python')
    ]);

    res.set('Cache-Control', 'no-store');
    res.json({ aptitude, verbal, reasoning, python });
  } catch (err) {
    console.error('getDashboardOverall error:', err);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

/**
 * GET – All module-level progress for sidebar ticks. Returns { aptitude, verbal, reasoning, python } arrays of rows.
 * Scoped by req.userId.
 */
const getModulesProgress = async (req, res) => {
  const userId = req.userId;

  try {
    const [aptitude, verbal, reasoning, python] = await Promise.all(
      VALID_SUBJECTS.map((subject) => {
        const table = getTableForSubject(subject);
        return db.query(
          `SELECT module_key, study_completed, exercise_completed, assignment_completed, coding_completed, module_completed
           FROM ${table}
           WHERE user_id = $1
           ORDER BY module_key`,
          [userId]
        ).then((r) => r.rows);
      })
    );

    res.set('Cache-Control', 'no-store');
    res.json({
      aptitude,
      verbal,
      reasoning,
      python
    });
  } catch (err) {
    console.error('getModulesProgress error:', err);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

module.exports = {
  completeContent,
  getSubjectOverall,
  getDashboardOverall,
  getModulesProgress
};
