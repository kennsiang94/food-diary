import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

MenuDishes = new Mongo.Collection('menuDishes');
UserDishes = new Mongo.Collection('userDishes'); 
//fields for menuDishes: dish name, picture link, description, price 
//fields for userDishes: dish name, tried counter, want to try, favourite, comments

if(Meteor.isClient) {


}

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

	
}

Meteor.methods({
//Facebook login method calls
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
	




})