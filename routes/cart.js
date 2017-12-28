var express = require('express');
var router = express.Router();
var common_library = require('./common_library');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var storage = multer.diskStorage({ //multers disk storage settings
	destination: function (req, file, cb) {
		cb(null, './uploads')
	},
	filename: function (req, file, cb) {
		var datetimestamp = Date.now();
		console.log(file)
		cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
	}
});
// var upload = multer({ //multer settings
// 	storage: storage
// }).single('file');
var upload = multer({ //multer settings
	storage: storage
}).array('file');
//var upload = multer({ storage: storage });


/* GET home page. */



router.get('/', function(req, res) {
  		res.render('cart');
	

// console.log(req.cookies['prod_ids']);	
//   res.render('cart', { title: 'Express',prod_list:'2' });
});

router.post('/upload',function(req, res) {
	upload(req,res,function(err){
		if(err){
			 res.json({error_code:1,err_desc:err});
			 return;
		}
		 res.json({error_code:0,err_desc:null});
	})
	//res.send(req.files);
});

router.get('/cartpro', function(req, res) {
	id = req.cookies.prod_ids;
common_library.select("*","products","pro_id in ("+id+")",function(err,result){
  	if(result){
  		res.send(JSON.stringify(result))
  	
  	}
  	else
  	{
  		console.log(err)
  	}

  });

// console.log(req.cookies['prod_ids']);	
//   res.render('cart', { title: 'Express',prod_list:'2' });
});

module.exports = router;
