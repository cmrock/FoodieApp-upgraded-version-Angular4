var promise = require('bluebird');
var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/recipes';
var db = pgp(connectionString);

// add query functions
function searchByIngredients(req, res, next){
    var recipeIngredients = req.params.ingredients;
    var recipe = recipeIngredients.replace(',','|');
    // db.any("SELECT * FROM recipecollection WHERE ingredients LIKE ALL (ARRAY['"+recipeIngredients.split(',')+"'])").then(function(data){
    db.any("SELECT * FROM recipecollection WHERE ingredients ~*'"+ recipe+"'").then(function(data){
        res.status(200)
            .json({
                staus: 'success',
                data: data,
                message: 'retrieved all rows with specific ingredients'
            });
        })
        .catch(function(err){
            return next(err)
        });
}
function searchWithExclusion(req, res, next){
    var recipeIng = req.params.ingredients;
    var recipeExclusion = req.params.exclusions;
    var recIng = recipeIng.replace(',','|');
    var recExc = recipeExclusion.replace(',','|');
    console.log("Here!!", recIng, recExc);
    db.any("SELECT * FROM recipecollection WHERE ingredients ~* '"+recIng+"' EXCEPT SELECT * FROM recipecollection WHERE ingredients ~* '"+ recExc+ "'").then(function(data){
        res.status(200)
            .json({
                staus: 'success',
                data: data,
                message: 'retrieved all rows with specific recipe name'
            });
    })
        .catch(function(err){
            return next(err)
        });
}
function searchByRecipeName(req, res, next){
    var recipeName = req.params.name;
    console.log("Here!!", recipeName);
    db.any("SELECT * FROM recipecollection WHERE name ~* '"+recipeName+"'").then(function(data){
        res.status(200)
            .json({
                staus: 'success',
                data: data,
                message: 'retrieved all rows with specific recipe name'
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