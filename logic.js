const express = require('express');
const { quizzes, results } = require('./data');
const app = express();
app.use(express.json());

// Create a new quiz
app.post('/quizzes', (req, res) => {
  const { title, questions } = req.body;
  const quiz = { id: quizzes.length + 1, title, questions };
  quizzes.push(quiz);
  res.status(201).json({ message: 'Quiz created', quiz });
});

// Get a quiz by ID
app.get('/quizzes/:id', (req, res) => {
  const quiz = quizzes.find(q => q.id === parseInt(req.params.id));
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  // Return questions without correct answers
  const questions = quiz.questions.map(q => {
    const { correct_option, ...rest } = q;
    return rest;
  });
  res.json({ ...quiz, questions });
});

// Submit an answer for a specific question in a quiz
app.post('/quizzes/:quizId/questions/:questionId/submit', (req, res) => {
  const { quizId, questionId } = req.params;
  const { userId, selectedOption } = req.body;

  const quiz = quizzes.find(q => q.id === parseInt(quizId));
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

  const question = quiz.questions.find(q => q.id === parseInt(questionId));
  if (!question) return res.status(404).json({ error: 'Question not found' });

  const isCorrect = question.correct_option === selectedOption;
  const result = {
    quiz_id: parseInt(quizId),
    user_id: parseInt(userId),
    question_id: parseInt(questionId),
    selected_option: selectedOption,
    is_correct: isCorrect
  };

  results.push(result);
  res.json({ correct: isCorrect, correctAnswer: isCorrect ? null : question.correct_option });
});

// Get user results for a specific quiz
app.get('/results/:quizId/:userId', (req, res) => {
  const { quizId, userId } = req.params;
  const userResults = results.filter(r => r.quiz_id === parseInt(quizId) && r.user_id === parseInt(userId));
  if (userResults.length === 0) return res.status(404).json({ error: 'No results found for this quiz and user' });

  const score = userResults.filter(r => r.is_correct).length;
  res.json({ quiz_id: parseInt(quizId), user_id: parseInt(userId), score, answers: userResults });
});

module.exports = app;
