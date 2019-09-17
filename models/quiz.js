const mongoose = require('mongoose');

// User Schema
const QuizSchema = mongoose.Schema({
  quiztype: {
    type: String,
    index: true,
  },
  questions: [],
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports.Quiz = Quiz;
