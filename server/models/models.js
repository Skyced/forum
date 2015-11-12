var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');

var questionValidator = [
  validate({
    validator: 'isLength',
    arguments: [10, 500],
    message: 'Title should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
];
var answersValidator = [
  validate({
    validator: 'isLength',
    arguments: [5, 500],
    message: 'Answer should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
];

var QuestionSchema = new mongoose.Schema({
    title:{type:String, required:true},
    numofanswers:{type:Number, required:true},
    description:{type:String},
    created_at: {type: Date, default: new Date},
    answers: [{type: Schema.Types.ObjectId, ref:'Answer'}]
})
var Question = mongoose.model('Question', QuestionSchema)

var AnswerSchema = new mongoose.Schema({
    _question: {type: Schema.Types.ObjectId, ref:'Question'},
    user: {type: String, required:true},
    answer: {type:String, required:true},
    details: {type:String},
    likes: {type:Number, required:true},
    created_at: {type: Date, default: new Date}
})
var Answer = mongoose.model('Answer', AnswerSchema);