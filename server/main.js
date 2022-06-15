Local_drinks = new Meteor.Collection('localdrinks');

// Deny all client-side updates to user documents
Meteor.users.deny({
  update() { return true; }
});

Meteor.methods({
  "edit_drink":function(title, img, glass, ingr, instr, id){
    const drink_toedit = Local_drinks.findOne({_id:id});
    if (this.userId == drink_toedit.owner) {
      Local_drinks.update({_id:id},
                    {$set: {title:title, img_src:img, glass:glass, ingredients:ingr, instructions:instr}});
    }
    else {
      console.log("Access denied while trying to edit drink");
    }

  },
  "find_random":function() {
    return HTTP.call('GET', "https://www.thecocktaildb.com/api/json/v1/1/random.php");
  },
  "search":function(drink_query) {
    return HTTP.call('GET', "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink_query);

  },
  "addDrink":function(title, img, glass, instructions, ingredients){
    const new_drink = {
      title:title,
      img_src:img,
      instructions:instructions,
      glass:glass,
      ingredients:ingredients,
      createdOn:new Date(),
      owner:this.userId
    };
    Local_drinks.insert(new_drink);
    console.log(new_drink);
  },
  "getUserDrinks":function(search_for){
    return Local_drinks.find({"title": {$regex:new RegExp(search_for, "i")}}).fetch();
  },
  "findmydrinks":function(){
    return Local_drinks.find({owner:this.userId}).fetch();
  },
  "delete_drink":function(drink_id){
    const drink_to_del = Local_drinks.findOne({_id:drink_id});
    if (drink_to_del.owner == this.userId) {
      Local_drinks.remove(drink_to_del);
    }
  },
  "find_byletter":function(letter){
    return HTTP.call('GET', "https://www.thecocktaildb.com/api/json/v1/1/search.php?f="+letter);
  },
  "find_ingr":function(ingr){
    return HTTP.call('GET', "https://www.thecocktaildb.com/api/json/v1/1/search.php?i="+ingr);
  }
});

// Use this to update cocktial entry
// Images.update({_id:image_id},
//               {$set: {rating:rating}});

Accounts.config({
    sendVerificationEmail: true
  });
