var express = require('express');
var router = express.Router();
var common_library = require('./common_library');
var cookieParser = require('cookie-parser');


/* GET home page. */
router.get('/', function(req, res) {
	//console.log(req.cookies['prod_ids']);
	var list = req.cookies['prod_ids'];
	// if (list != '' && typeof(list) !== undefined ) 
	// {
	// 	res.send(list.length)
	// };
	
  res.render('index', { title: 'Express',prod_list:'2' });
});

module.exports = router;
