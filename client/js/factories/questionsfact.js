myApp.factory('questionsFactory', function($http){
    var factory = {};
    factory.getQuestions = function(callback){
        $http.get('/all_questions').success(function(data){
            callback(data);
        })
    }
    factory.addQuestion = function(info, callback){
        $http({
            url:'/add_question',
            method:'POST',
            data:{'question_info':info}
        })
            .success(function(response){
                callback(response);
            })
    }
    factory.getthatQuestion = function(info, callback){
        console.log('factory',info)
        $http({
            url:'/one_question',
            method:'GET',
            params:{question_id: info}
        })
            .then(function(response){
                console.log('[FACTORY] one question data:', response.data);
                callback(response.data)
            })
        
    }
    return factory
})