MenuDishes = new Mongo.Collection('menuDishes');
UserDishes = new Mongo.Collection('userDishes'); 
//fields for menuDishes: dish name, picture link, description, price 
//fields for userDishes: dish name, tried counter, want to try, favourite, comments

Meteor.methods({

//Want To Try methods
    'addWant': function(dishName){
        check(dishName, String);
        var currentUserId = Meteor.userId();
        if (currentUserId){
            if (!UserDishes.findOne({createdBy: currentUserId, name: dishName})){
                UserDishes.insert({
                    name: dishName,
                    triedCounter: 0,
                    wantToTry: true,
                    fav: false,
                    comments: [],
                    createdBy: currentUserId,
                })
            }else{
                UserDishes.update({createdBy: currentUserId, name: dishName},
                                    {$set: {wantToTry: true}})
            };
        };
    },

    'findWant': function(){
        var currentUserId = Meteor.userId();
        if (currentUserId){
            return UserDishes.find({createdBy: currentUserId, wantToTry: true});
        };
    },


//Favourite methods
    'addFav': function(dishName){
        check(dishName, String);
        var currentUserId = Meteor.userId();
        if (currentUserId){
            if (!UserDishes.findOne({createdBy: currentUserId, name: dishName})){
                UserDishes.insert({
                    name: dishName,
                    triedCounter: 1,
                    wantToTry: false,
                    fav: true,
                    comments: [],
                    createdBy: currentUserId,
                })
            }else{
                var dish = UserDishes.findOne({createdBy: currentUserId, name: dishName});
                UserDishes.update({createdBy: currentUserId, name: dishName},
                                    {$set: {fav: true}});
                if (dish.triedCounter == 0){
                    UserDishes.update({createdBy: currentUserId, name: dishName},
                                        {$inc: {triedCounter: 1}});                    
                }
            };
        };
    },

    'findFav': function(){
        var currentUserId = Meteor.userId();
        if (currentUserId){
            return UserDishes.find({createdBy: currentUserId, fav: true});
        };
    },

//Past Dishes methods
    'addPast': function(dishName){
        check(dishName, String);
        var currentUserId = Meteor.userId();
        if (currentUserId){
            if (!UserDishes.findOne({createdBy: currentUserId, name: dishName})){
                UserDishes.insert({
                    name: dishName,
                    triedCounter: 1,
                    wantToTry: false,
                    fav: false,
                    comments: [],
                    createdBy: currentUserId,
                })
            }else{
                UserDishes.update({createdBy: currentUserId, name: dishName},
                                    {$inc: {triedCounter: 1}})
            };
        };
    },

    'findPast': function(){
        var currentUserId = Meteor.userId();
        if (currentUserId){
            return UserDishes.find({createdBy: currentUserId, triedCounter: {$gt: 0}});
        };
    },
    
//Comments methods
    'addComments': function(dishName, comment){
        
    }

});



if(Meteor.isClient) {
	Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },
 
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});
};

if(Meteor.isServer) {
	//Facebook configuration settings
	ServiceConfiguration.configurations.remove({
    service: 'facebook'
	});
 
	ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1273586539339914',
    secret: '67a494fc9cd1c8cbda26e75428307505'
	});

	
};
