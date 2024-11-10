const request = require('supertest');
const app = require('../logic');

describe('Quiz API Integration Tests', () => {
  let quizId = null;

  // Test case for creating a quiz
  test('should create a quiz', async () => {
    const response = await request(app).post('/quizzes').send({
      title: 'Math Quiz',
      questions: [
        {
          id: 1,
          text: 'What is 2+2?',
          options: ['3', '4', '5', '6'],
          correct_option: 1
        }
      ]
    });

    expect(response.status).toBe(201); 
    expect(response.body.message).toBe('Quiz created');
    quizId = response.body.quiz.id; 
  });

  // Test case for getting a quiz by ID
  test('should get a quiz by ID', async () => {
    const response = await request(app).get(`/quizzes/${quizId}`);

    expect(response.status).toBe(200); 
    expect(response.body.id).toBe(quizId);
    expect(response.body.title).toBe('Math Quiz');
    expect(response.body.questions).toHaveLength(1); 
  });

  // Test case for submitting a correct answer
  test('should submit a correct answer', async () => {
    const response = await request(app)
      .post(`/quizzes/${quizId}/questions/1/submit`)
      .send({ userId: 1, selectedOption: 1 });

    expect(response.status).toBe(200); 
    expect(response.body.correct).toBe(true); 
    expect(response.body.correctAnswer).toBeNull(); 
  });

  // Test case for submitting an incorrect answer
  test('should submit an incorrect answer', async () => {
    const response = await request(app)
      .post(`/quizzes/${quizId}/questions/1/submit`)
      .send({ userId: 202, selectedOption: 0 });

    expect(response.status).toBe(200); 
    expect(response.body.correct).toBe(false); 
    expect(response.body.correctAnswer).toBe(1); 
  });

  // Test case for getting results of a user
  test('should get results for a user', async () => {
    const response = await request(app).get(`/results/${quizId}/1`);

    expect(response.status).toBe(200); 
    expect(response.body.score).toBe(1); 
    expect(response.body.answers).toHaveLength(1); 
  });

  // Test case for when no results are found
  test('should return 404 if no results found for the quiz and user', async () => {
    const response = await request(app).get('/results/999/1'); 

    expect(response.status).toBe(404); 
    expect(response.body.error).toBe('No results found for this quiz and user');
  });
});
