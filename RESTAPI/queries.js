var promise = require('bluebird');
var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/recipes';
var db = pgp(connectionString);

/*
* API function for search recipe by ingredients (searchByIngredients)
*/ 
function searchByIngredients(req, res, next){
    var recipeIngredients = req.params.ingredients;
    var recipe = recipeIngredients.replace(/,/gi,'&');
    // db.any("SELECT * FROM recipecollection WHERE ingredients LIKE ALL (ARRAY['"+recipeIngredients.split(',')+"'])").then(function(data){
    db.any("SELECT * FROM recipecollection WHERE ingredients @@to_tsquery ('"+ recipe+"')").then(function(data){
        res.status(200)
            .json({
                staus: 'success',
                data: data,
                message: 'retrieved all recipes with specific ingredients'
            });
        })
        .catch(function(err){
            return next(err)
        });
}
/*
* API function for search recipe by ingredients with exclusion of ingredients (searchWithExclusion)
*/
function searchWithExclusion(req, res, next){
    var recipeIng = req.params.ingredients;
    var recipeExclusion = req.params.exclusions;
    var recIng = recipeIng.replace(/,/gi,'&');
    var recExc = recipeExclusion.replace(/,/gi,'&');
    console.log("Here!!", recIng, recExc);
    db.any("SELECT * FROM recipecollection WHERE ingredients @@to_tsquery('"+recIng+"') EXCEPT SELECT * FROM recipecollection WHERE ingredients @@to_tsquery('"+recExc+"')").then(function(data){
        res.status(200)
            .json({
                staus: 'success',
                data: data,
                message: 'retrieved all recipes with specific ingredients and excluded ingredients'
            });
    })
        .catch(function(err){
            return next(err)
        });
}
function searchByRecipeName(req, res, next){
    var recipeName = req.params.name;
    db.any("SELECT * FROM recipecollection WHERE name ~* '"+recipeName+"'").then(function(data){
        res.status(200)
            .json({
                staus: 'success',
                data: data,
                message: 'retrieved recipe with specific name'
            });
    })
    .catch(function(err){
        return next(err)
    });
}
module.exports = {
    searchByIngredients: searchByIngredients,
    searchWithExclusion: searchWithExclusion,
    searchByRecipeName: searchByRecipeName,
    // addFav: addFav,
    // getAllFav: getAllFav,
    // delFav: delFav
};