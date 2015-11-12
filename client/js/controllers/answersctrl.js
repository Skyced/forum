myApp.controller('answersController', function(questionsFactory, answersFactory, $routeParams){
    var that = this;
    this.question = [];
    this.messages = [];
    var getQuestion = function(){
        question_id = $routeParams.id
        console.log(question_id)
        answersFactory.getQuestion(question_id, function(data){
            that.question = data;
        })
    }
    getQuestion();
    this.addAnswer = function(){
        this.newAnswer.id = $routeParams.id
        answersFactory.addAnswer(this.newAnswer, function(data){
            // getAnswers();
            that.messages = data
            console.log('Success!')
        })
        this.newAnswer = {};
    }
})