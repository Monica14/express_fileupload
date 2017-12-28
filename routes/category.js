var express = require('express');
var router = express.Router();
var common_library = require('./common_library');

/* GET users listing. */
router.get('/', function(req, res) {
  //res.send(common_library.con);
  common_library.select("*","categories","1",function(err,result){
  	if(result){
  		// console.log(JSON.stringify(result) )
  		res.send(JSON.stringify(result))
  	}

  });
});

module.exports = router;
