const db = require('../config/db');

const SUBJECT_TABLES = {
  aptitude: 'user_aptitude_progress',
  verbal: 'user_verbal_progress',
  reasoning: 'user_reasoning_progress',
  programming: 'user_programming_progress'
};

function getTableForSubject(subject) {
  const table = SUBJECT_TABLES[subject];
  if (!table) return null;
  return table;
}

/**
 * Chapter-wise progress for one subject. Scoped by userId.
 * Returns [{ chapterKey, progressPercentage }].
 * progressPercentage = (completed_modules / total_modules) * 100 per chapter, rounded.
 */
async function getChapterProgress(tableName, userId) {
  const { rows } = await db.query(
    `SELECT chapter_key,
            COUNT(*) AS total,
            SUM(CASE WHEN module_completed = true THEN 1 ELSE 0 END) AS completed
     FROM ${tableName}
     WHERE user_id = $1
     GROUP BY chapter_key
     ORDER BY chapter_key`,
    [userId]
  );
  return rows.map((r) => {
    const total = Number(r.total) || 0;
    const completed = Number(r.completed) || 0;
    const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      chapterKey: r.chapter_key,
      progressPercentage: Math.min(100, Math.max(0, progressPercentage))
    };
  });
}

/**
 * Subject overall progress. Scoped by userId.
 * Returns { subject, overallProgress } where overallProgress = (completed / total) * 100, rounded.
 */
async function getOverallProgress(tableName, userId, subject) {
  const { rows } = await db.query(
    `SELECT COUNT(*) AS total,
            SUM(CASE WHEN module_completed = true THEN 1 ELSE 0 END) AS completed
     FROM ${tableName}
     WHERE user_id = $1`,
    [userId]
  );
  const total = Number(rows[0]?.total) || 0;
  const completed = Number(rows[0]?.completed) || 0;
  const overallProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
  return {
    subject,
    overallProgress: Math.min(100, Math.max(0, overallProgress))
  };
}

// ---- Chapter-wise (4 APIs) ----

const getAptitudeChapters = async (req, res) => {
  const userId = req.userId;
  const table = getTableForSubject('aptitude');
  if (!table) return res.status(400).json({ error: 'Invalid subject' });
  try {
    const data = await getChapterProgress(table, userId);
    res.set('Cache-Control', 'no-store');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

const getVerbalChapters = async (req, res) => {
  const userId = req.userId;
  const table = getTableForSubject('verbal');
  if (!table) return res.status(400).json({ error: 'Invalid subject' });
  try {
    const data = await getChapterProgress(table, userId);
    res.set('Cache-Control', 'no-store');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

const getReasoningChapters = async (req, res) => {
  const userId = req.userId;
  const table = getTableForSubject('reasoning');
  if (!table) return res.status(400).json({ error: 'Invalid subject' });
  try {
    const data = await getChapterProgress(table, userId);
    res.set('Cache-Control', 'no-store');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

const getProgrammingChapters = async (req, res) => {
  const userId = req.userId;
  const table = getTableForSubject('programming');
  if (!table) return res.status(400).json({ error: 'Invalid subject' });
  try {
    const data = await getChapterProgress(table, userId);
    res.set('Cache-Control', 'no-store');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

// ---- Subject overall (4 APIs) ----

const getAptitudeOverall = async (req, res) => {
  const userId = req.userId;
  const table = getTableForSubject('aptitude');
  if (!table) return res.status(400).json({ error: 'Invalid subject' });
  try {
    const data = await getOverallProgress(table, userId, 'aptitude');
    res.set('Cache-Control', 'no-store');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

const getVerbalOverall = async (req, res) => {
  const userId = req.userId;
  const table = getTableForSubject('verbal');
  if (!table) return res.status(400).json({ error: 'Invalid subject' });
  try {
    const data = await getOverallProgress(table, userId, 'verbal');
    res.set('Cache-Control', 'no-store');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

const getReasoningOverall = async (req, res) => {
  const userId = req.userId;
  const table = getTableForSubject('reasoning');
  if (!table) return res.status(400).json({ error: 'Invalid subject' });
  try {
    const data = await getOverallProgress(table, userId, 'reasoning');
    res.set('Cache-Control', 'no-store');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

const getProgrammingOverall = async (req, res) => {
  const userId = req.userId;
  const table = getTableForSubject('programming');
  if (!table) return res.status(400).json({ error: 'Invalid subject' });
  try {
    const data = await getOverallProgress(table, userId, 'programming');
    res.set('Cache-Control', 'no-store');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

// ---- Dashboard total (1 API) ----

const getDashboardOverall = async (req, res) => {
  const userId = req.userId;
  try {
    const [aptitude, verbal, reasoning, programming] = await Promise.all([
      getOverallProgress(SUBJECT_TABLES.aptitude, userId, 'aptitude'),
      getOverallProgress(SUBJECT_TABLES.verbal, userId, 'verbal'),
      getOverallProgress(SUBJECT_TABLES.reasoning, userId, 'reasoning'),
      getOverallProgress(SUBJECT_TABLES.programming, userId, 'programming')
    ]);
    res.set('Cache-Control', 'no-store');
    res.json({
      aptitude: aptitude.overallProgress,
      verbal: verbal.overallProgress,
      reasoning: reasoning.overallProgress,
      programming: programming.overallProgress
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

module.exports = {
  getChapterProgress,
  getOverallProgress,
  getAptitudeChapters,
  getVerbalChapters,
  getReasoningChapters,
  getProgrammingChapters,
  getAptitudeOverall,
  getVerbalOverall,
  getReasoningOverall,
  getProgrammingOverall,
  getDashboardOverall
};
