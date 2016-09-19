import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

MenuDishes = new Mongo.Collection('menuDishes');
UserDishes = new Mongo.Collection('userDishes'); 
//fields for menuDishes: dish name, picture link, description, price 
//fields for userDishes: dish name, tried counter, want to try, favourite, comments

if(Meteor.isClient) {


}

if(Meteor.isServer) {

	
}

Meteor.methods({


})