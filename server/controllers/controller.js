var mongoose = require('mongoose');
var Question = mongoose.model('Question')
var Answer = mongoose.model('Answer');
module.exports = {
    all_questions:function(req, res){
        Question.find({}, function(err, results){
            if(err)
                console.log('Error@allQuestions')
            else
                res.json(results)
        })
    },
    add_questions: function(req, res){
        console.log(req.body.questions);
        console.log(req.body)
        var question = new Question({
            title:req.body.question_info.question,
            description: req.body.question_info.description,
            numofanswers: 0
        })
        req.params.id = question._id
        console.log(req.params.id);
        question.save(function(err){
            if(err)
                {console.log('error@addQuestion', err.errors.title.properties.message)
                                res.json(err.errors.title.properties.message)}
            else
                {console.log('added!');
                                res.json('Question was Added to the message board')}
        })
    },
    one_question: function(req, res){
        console.log('server',req.query)
        Question.findOne({_id: req.query.question_id})
        .populate('answers')
        .exec(function(err, data){
            if(err)
                console.log('error')
            else
                console.log(data);
                res.json(data);
        })
    }
}