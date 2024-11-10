# Quiz API

This is a simple Quiz application built using **Node.js** and **Express.js**. It allows users to create quizzes, answer questions, and get results.

## Features

- **Create Quiz**: Users can create a quiz with multiple questions.
- **Get Quiz**: Fetch a quiz by its ID without revealing the correct answers.
- **Submit Answer**: Users can submit answers for each question in a quiz.
- **Get Results**: Get the user's score and a summary of their answers for a specific quiz.

## Technologies Used

- **Node.js** - JavaScript runtime for server-side programming.
- **Express.js** - Web framework for building APIs.
- **In-memory storage** - Data is stored temporarily in memory for the quiz system.

## API Endpoints

### 1. Create Quiz

**POST** `/quizzes`

Create a new quiz with a set of questions.

#### Request Body:

```json
{
  "title": "Sample Quiz",
  "questions": [
    {
      "id": 1,
      "text": "What is 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "correct_option": 1
    },
    {
      "id": 2,
      "text": "What is 3 + 3?",
      "options": ["5", "6", "7", "8"],
      "correct_option": 1
    }
  ]
}
