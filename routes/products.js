var express = require('express');
var router = express.Router();
var common_library = require('./common_library');
var cookieParser = require('cookie-parser');

/* GET users listing. */
router.get('/', function(req, res) {
  //res.send(common_library.con);
  common_library.select("*","products","1",function(err,result){
  	if(result){
  		// console.log(JSON.stringify(result) )
  		res.send(JSON.stringify(result))
  	}

  });
});

router.post('/filtercat', function(req, res) {  
   common_library.select("*","products","pro_caid = '"+req.body.id+"'",function(err,result){
    if(result){
      //console.log(JSON.stringify(result) )
      res.send(JSON.stringify(result))
    }

  });
});
router.post('/filtercat1', function(req, res) {  
  if(req.body.type == 'br')
  {
    cond = "pro_brid = '"+req.body.id+"'"
  }
  if(req.body.type == 'cat')
  {
    cond = "pro_caid = '"+req.body.id+"'"
  }
   common_library.select("*","products",cond,function(err,result){
    if(result){
      //console.log(JSON.stringify(result) )
      res.send(JSON.stringify(result))
    }

  });
});

router.post('/add_to_cart', function(req, res) {	
	res.cookie('prod_ids', req.body.id_list,{expire : new Date() + (24*60*60),maxAge:86400});
	res.send(req.cookies['prod_ids'],1,{expire : new Date() + (24*60*60),maxAge:86400})
	//cookies = new Cookies( request, response, [ options ] )
  // //res.send(common_library.con);
  // common_library.select("*","products","1",function(err,result){
  // 	if(result){
  // 		// console.log(JSON.stringify(result) )
  // 		res.send(JSON.stringify(result))
  // 	}

  // });
});

module.exports = router;
