var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
// var forum = require()
module.exports = function(app){
    app.get('/all_questions', function(req, res){
        Question.find({}, function(err, results){
            if(err)
                console.log('Error@allQuestions')
            else
                res.json(results)
        })
    })
    app.post('/add_question', function(req, res){
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
    })
    app.get('/one_question', function(req, res){
        console.log('server',req.query)
        // Question.findOne({_id: req.query.question_id}, function(err, results){
        //     if(err)
        //         console.log('er')
        //     else
        //         console.log(results);
        // })
        Question.findOne({_id: req.query.question_id})
        .populate('answers')
        .exec(function(err, data){
            if(err)
                console.log('error')
            else
                console.log('find one method:',data);
                res.json(data);
        })
    })
    app.get('/get_question', function(req, res){
        console.log(req.query.question_info)
        Question.findOne({_id: req.query.question_info}, function(err, results){
            if(err)
                console.log('Error@getQuestion')
            else
                res.json(results)
        } )
    })
    app.post('/add_answer', function(req, res){
        console.log(req.body)
        
        Question.findOne({_id: req.body.answer_info.id}, function(err, question){

            var answer = new Answer({
            _question:req.body.answer_info.id,
            user: req.body.user,
            answer: req.body.answer_info.answer,
            details: req.body.answer_info.detail,
            likes: 0
        })
            console.log('new answer object',answer)
            question.answers.push(answer);
            console.log('question',question)
            answer.save(function(err){
                if(err){
                    console.log('ERROR at adding answer')
                }
                else {
                question.save(function(err){
                    if(err)
                       {console.log('error@add answer', err)
                        res.json(err.errors.title.properties.message)}
                    else 
                        Question.update({_id: req.body.answer_info.id}, {$inc:{numofanswers:+1}}, function(err, results){
                                if(err){
                                    console.log('errors')
                                    res.json('Error adding answer')
                                }
                                else{
                                    console.log('updated')
                                    res.json(results)
                                }
                            })

                        
                        // {res.redirect('/questinfo/'+req.body.answer_info.id)}
                })
            }
            })
        })
    })
app.post('/add_like', function(req, res){
    console.log(req.body.like_id)
    Answer.update({_id:req.body.like_id}, {$inc:{likes:+1}}, function(err, results){
        if(err)
            console.log("Error@like")
        else
            res.json(results);
    })
})
}