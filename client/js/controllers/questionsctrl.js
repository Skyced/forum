myApp.controller('questionsController', function(questionsFactory, $routeParams, answersFactory){
    var that=this;
    questionid = $routeParams.id;
    console.log('controller',questionid)
    var getallQuestions = function(){
        questionsFactory.getQuestions(function(data){
            that.questions = data;
        })
    }
    getallQuestions();
    this.addQuestion = function(){
        questionsFactory.addQuestion(this.newQuestion, function(message){
            getallQuestions();
            console.log(message)
            that.messages = message
        })
        this.newQuestion = {};
        }
    var getthatQuestion = function(){
        questionsFactory.getthatQuestion(questionid, function(data){
            console.log('[CONTROLLER] That Question:',data);
            that.question = data;
        })
    }
    getthatQuestion();
    this.addLikes = function(info){
        console.log(info)
        answersFactory.addLikes(info, function(data){
            console.log('likes added');
            getthatQuestion();
        })
    }
})