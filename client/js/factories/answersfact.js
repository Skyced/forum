myApp.factory('answersFactory', function($http, $location){
    var factory =  {};
    factory.getQuestion = function(info, callback){
        $http({
            url:'/get_question',
            method:'GET',
            params:{
                'question_info':info
            }
        }).success(function(data){
            console.log(data);
            callback(data)
        })
    }
    factory.addAnswer = function(info, callback){
        $http({
            url:'/add_answer',
            method:'POST',
            data: {'answer_info': info, 'user':user}
        })
        .success(function(response){
            console.log('[FACTORY] add answer response',response)
            if(response.ok){
                callback(response)
                $location.path('')
            }
            else{
                console.log('[FACTORY] failed to add answer', response)
                callback(response)
            }
        })
    }
    factory.addLikes = function(info, callback){
        $http({
            url:'/add_like',
            method:'POST',
            data:{'like_id':info}
        }).success(function(data){
            console.log(data);
            callback()
        })
    }
    return factory;
})