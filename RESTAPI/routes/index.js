var express = require('express');
var router = express.Router();
var cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:4200'
};
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/home.html');
});

var db = require('../queries');
router.get('/searchByIngredients/:ingredients', cors(corsOptions), db.searchByIngredients);
router.get('/searchWithExclusion/:ingredients/:exclusions', cors(corsOptions), db.searchWithExclusion);
router.get('/searchByRecipeName/:name/', cors(corsOptions), db.searchByRecipeName);
// router.post('/addFav/:email/:recipe_name/:image/:url', db.addFav);
// router.get('/getAllFav/:email', db.getAllFav);
// router.put('/delFav/:email/:recipe_name', db.delFav);


module.exports = router;