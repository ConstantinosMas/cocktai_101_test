Meteor.subscribe("localdrinks");

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route("/", function () {
  this.render("header", {
    to:"navbar"
  });
  this.render("home_menu", {
    to:"main"
  });
});

Router.route("/search", function () {
  this.render("header", {
    to:"navbar"
  });
  this.render("home", {
    to:"main"
  });
});

Router.route("/search/results", function () {
  this.render("header", {
    to:"navbar"
  });
  this.render("home", {
    to:"main"
  });
  this.render("search_results", {
    to:"extra"
  });
});

Router.route("/my_drinks", function () {
  this.render("header", {
    to:"navbar"
  });
  this.render("myCocktails", {
    to:"main"
  });
});

Router.route("/new_drink", function () {
  this.render("header", {
    to:"navbar"
  });
  this.render("form", {
    to:"main"
  });
});

Router.route("/random_cocktail", function () {
  this.render("header", {
    to:"navbar"
  });
  this.render("random_drink", {
    to:"main"
  });
});

Router.route("/ingr_search", function () {
  this.render("header", {
    to:"navbar"
  });
  this.render("ingredient", {
    to:"main"
  });
});

Router.route("/by_letter_list", function () {
  this.render("header", {
    to:"navbar"
  });
  this.render("by_letter", {
    to:"main"
  });
});















Template.body.helpers({
  islogged_in:function() {
    if (Meteor.user()) {
      return true;
    }
    else {
      return false;
    }
  },
  current_drink:function() {
    if (Session.get("current_drink")) {
      return Session.get("current_drink");
    }
    else {
      return;
    }
  },
  current_user_drink:function() {
    if (Session.get("current_user_drink")) {
      return Session.get("current_user_drink");
    }
    else {
      return;
    }
  }
});

Template.myCocktails.helpers({
  own_drinks:function(){
    return Session.get("my_drinks");
  },
  editing_drink:function(){
    return Session.get("drink_to_edit");
  },
  username:function(){
    return Meteor.user().username || Meteor.user().profile.name;
  }

});

Template.header.helpers({
  islogged_in:function() {
    if (Meteor.user()) {
      return true;
    }
    else {
      return false;
    }
  }
});

Template.search_results.helpers({
  searched_for:function(){
    return Session.get("searched_for");
  },
  user_results:function(){
    return Session.get("user_drinks");
  },
  results:function() {
    if (Session.get("drinks_array")) {
      return true;
    }
    else {
      return false;
    }
  },
  drinks:function(){
    return Session.get("drinks_array");
  }
});

Template.random_drink.helpers({
  chosen_random_drink:function(){
    return Session.get("random_cocktail");
  },
  chosen_random_ingr:function(){
    const random_drink_ingredients = [{ingr:Session.get("random_cocktail")[0].strIngredient1,
                                        measure:Session.get("random_cocktail")[0].strMeasure1
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient2,
                                         measure:Session.get("random_cocktail")[0].strMeasure2
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient3,
                                         measure:Session.get("random_cocktail")[0].strMeasure3
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient4,
                                         measure:Session.get("random_cocktail")[0].strMeasure4
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient5,
                                         measure:Session.get("random_cocktail")[0].strMeasure5
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient6,
                                         measure:Session.get("random_cocktail")[0].strMeasure6
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient7,
                                         measure:Session.get("random_cocktail")[0].strMeasure7
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient8,
                                         measure:Session.get("random_cocktail")[0].strMeasure8
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient9,
                                         measure:Session.get("random_cocktail")[0].strMeasure9
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient10,
                                         measure:Session.get("random_cocktail")[0].strMeasure10
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient11,
                                         measure:Session.get("random_cocktail")[0].strMeasure11
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient12,
                                         measure:Session.get("random_cocktail")[0].strMeasure12
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient13,
                                         measure:Session.get("random_cocktail")[0].strMeasure13
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient14,
                                         measure:Session.get("random_cocktail")[0].strMeasure14
                                       },
                                       {ingr:Session.get("random_cocktail")[0].strIngredient15,
                                         measure:Session.get("random_cocktail")[0].strMeasure15
                                       }
  ];
    return random_drink_ingredients;
  }
});

Template.by_letter.helpers({
  letters:function(){
    const letters = ["a", "b", "c", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    return letters;
  },
  letter_list:function(){
    return Session.get("chosen_letter_list");
  }
});

Template.ingredient.helpers({
  returned_ingr:function(){
    return Session.get("ingr_results");
  }
});





Template.random_drink.events({
  "click .js-random":function() {
    Meteor.call("find_random", function(err, res){
      if (!err) {
        const random_cocktail = JSON.parse(res.content);
        Session.set("random_cocktail", random_cocktail.drinks);
      }
      else {
        console.log("Error while making API call:" +err);
      }
    });
  }
});

Template.home.events({
  "click .js-search":function(){
    const drink_query = $('input[name="drink_search"]').val();
    Session.set("searched_for", drink_query);

    Meteor.call("search", drink_query, function(error, result) {
      if(!error){
        const drinks_result = JSON.parse(result.content);
        Session.set("drinks_array", drinks_result.drinks);
      }
      else{
        console.log("Error while making API request:" +error);
      }
    });
    Meteor.call("getUserDrinks", drink_query, function(error, result){
      if (!error){
        Session.set("user_drinks", result);
      }

    });
  }
});

Template.search_results.events({
  "click .result_thumbnail":function() {
    const current_drink_ingredients = [{ingr:this.strIngredient1,
                                        measure:this.strMeasure1
                                       },
                                       {ingr:this.strIngredient2,
                                         measure:this.strMeasure2
                                       },
                                       {ingr:this.strIngredient3,
                                         measure:this.strMeasure3
                                       },
                                       {ingr:this.strIngredient4,
                                         measure:this.strMeasure4
                                       },
                                       {ingr:this.strIngredient5,
                                         measure:this.strMeasure5
                                       },
                                       {ingr:this.strIngredient6,
                                         measure:this.strMeasure6
                                       },
                                       {ingr:this.strIngredient7,
                                         measure:this.strMeasure7
                                       },
                                       {ingr:this.strIngredient8,
                                         measure:this.strMeasure8
                                       },
                                       {ingr:this.strIngredient9,
                                         measure:this.strMeasure9
                                       },
                                       {ingr:this.strIngredient10,
                                         measure:this.strMeasure10
                                       },
                                       {ingr:this.strIngredient11,
                                         measure:this.strMeasure11
                                       },
                                       {ingr:this.strIngredient12,
                                         measure:this.strMeasure12
                                       },
                                       {ingr:this.strIngredient13,
                                         measure:this.strMeasure13
                                       },
                                       {ingr:this.strIngredient14,
                                         measure:this.strMeasure14
                                       },
                                       {ingr:this.strIngredient15,
                                         measure:this.strMeasure15
                                       }
  ];
  // console.log(current_drink_ingredients);



    Session.set("current_drink", {
      title:this.strDrink,
      img_src:this.strDrinkThumb,
      instructions:this.strInstructions,
      glass:this.strGlass,
      ingredients:current_drink_ingredients});
    $("#drinkModal").modal("show");
  },
  "click .user_result_thumbnail":function() {
    Session.set("current_user_drink", {
      title:this.title,
      img_src:this.img_src,
      ingredients:this.ingredients,
      instructions:this.instructions,
      glass:this.glass});
      $("#userdrinkModal").modal("show");
  }
});

Template.form.events({
  "click .js-add-drink":function(){
    const title = $('input[name="new_drink_title"]').val();
    const img = $('input[name="new_drink_img"]').val();
    const glass = $('input[name="new_drink_glass"]').val();
    const instructions = $('textarea[name="new_drink_instr"]').val();
    const ingredients = $('input[name="new_drink_ingr"]').val();
    if(title != "" && img != "" &&  glass != "" && instructions != "" && ingredients != "") {
      Meteor.call("addDrink", title, img, glass, instructions, ingredients);
    }
    else {
      return;
    }

  }
});

Template.header.events({
  "click .js-mycocktails":function(){
    Meteor.call("findmydrinks", function(error, result) {
      if (!error) {
        Session.set("my_drinks", result);
        return;
      }
      else {
        console.log(error);
      }
    });
  },
  "click .js-random":function() {
    Meteor.call("find_random", function(err, res){
      if (!err) {
        const random_cocktail = JSON.parse(res.content);
        Session.set("random_cocktail", random_cocktail.drinks);
      }
      else {
        console.log("Error while making API call:" +err);
      }
    });
  }
});

Template.myCocktails.events({
  "click .js-edit-initial":function(){
    Session.set("drink_to_edit", this);
    $("#editModal").modal("show");
  },
  "click .js-delete-initial":function(){
    Session.set("to_delete", this._id);
    $("#deleteModal").modal("show");
  },
  "click .js-delete":function(){
    Meteor.call("delete_drink", Session.get("to_delete"));
    Meteor.call("findmydrinks", function(error, result) {
      if (!error) {
        Session.set("my_drinks", result);
        return;
      }
      else {
        console.log(error);
      }
    });
  },
  "click .user_result_thumbnail":function() {
    Session.set("current_user_drink", {
      title:this.title,
      img_src:this.img_src,
      instructions:this.instructions,
      ingredients:this.ingredients,
      glass:this.glass});
      $("#userdrinkModal").modal("show");
  },
  "click .js-edit":function(){
    const new_title = $('input[name="edit_drink_title"]').val();
    const new_img_src = $('input[name="edit_drink_img"]').val();
    const new_glass = $('input[name="edit_drink_glass"]').val();
    const new_ingr = $('input[name="edit_drink_ingr"]').val();
    const new_instr = $('textarea[name="edit_drink_instr"]').val();

    Meteor.call("edit_drink", new_title, new_img_src, new_glass, new_ingr, new_instr, Session.get("drink_to_edit")._id);
    Meteor.call("findmydrinks", function(error, result) {
      if (!error) {
        Session.set("my_drinks", result);
        return;
      }
      else {
        console.log(error);
      }
    });
  }
});

Template.by_letter.events({
  "click .letter-list":function(){
    Meteor.call("find_byletter", this[0], function(err, res){
      if (!err) {
        const letter_list = JSON.parse(res.content);
        Session.set("chosen_letter_list", letter_list.drinks);
      }
      else {
        console.log("Error while making API call:" +err);
      }
    });
  },
  "click .result_thumbnail":function() {
    const current_drink_ingredients = [{ingr:this.strIngredient1,
                                        measure:this.strMeasure1
                                       },
                                       {ingr:this.strIngredient2,
                                         measure:this.strMeasure2
                                       },
                                       {ingr:this.strIngredient3,
                                         measure:this.strMeasure3
                                       },
                                       {ingr:this.strIngredient4,
                                         measure:this.strMeasure4
                                       },
                                       {ingr:this.strIngredient5,
                                         measure:this.strMeasure5
                                       },
                                       {ingr:this.strIngredient6,
                                         measure:this.strMeasure6
                                       },
                                       {ingr:this.strIngredient7,
                                         measure:this.strMeasure7
                                       },
                                       {ingr:this.strIngredient8,
                                         measure:this.strMeasure8
                                       },
                                       {ingr:this.strIngredient9,
                                         measure:this.strMeasure9
                                       },
                                       {ingr:this.strIngredient10,
                                         measure:this.strMeasure10
                                       },
                                       {ingr:this.strIngredient11,
                                         measure:this.strMeasure11
                                       },
                                       {ingr:this.strIngredient12,
                                         measure:this.strMeasure12
                                       },
                                       {ingr:this.strIngredient13,
                                         measure:this.strMeasure13
                                       },
                                       {ingr:this.strIngredient14,
                                         measure:this.strMeasure14
                                       },
                                       {ingr:this.strIngredient15,
                                         measure:this.strMeasure15
                                       }
  ];
  // console.log(current_drink_ingredients);
    Session.set("current_drink", {
      title:this.strDrink,
      img_src:this.strDrinkThumb,
      instructions:this.strInstructions,
      glass:this.strGlass,
      ingredients:current_drink_ingredients});
    $("#drinkModal").modal("show");
  }

});

Template.ingredient.events({
  "click .js-ingr-search":function(){
    const ingr_query = $('input[name="ingr_search"]').val();
    Meteor.call("find_ingr", ingr_query, function(err, res) {
      if (!err) {
        const ingr_res = JSON.parse(res.content);
        Session.set("ingr_results", ingr_res.ingredients);
      }
      else {
        console.log("Error while making API call:" + err);
      }
    });
  }
});

Template.home_menu.events({
  "click .js-random":function() {
    Meteor.call("find_random", function(err, res){
      if (!err) {
        const random_cocktail = JSON.parse(res.content);
        Session.set("random_cocktail", random_cocktail.drinks);
      }
      else {
        console.log("Error while making API call:" +err);
      }
    });
  }
});
