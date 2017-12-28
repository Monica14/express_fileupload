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

var upload = multer({ storage: storage });


/* GET home page. */



router.get('/', function(req, res) {
  		res.render('cart');
});

router.post('/upload',upload.any(),function(req, res) {	
	if(req.files && req.files[0].filename)
	{
		req.body.filename = req.files[0].filename;
		req.body.destination = req.files[0].destination;
		common_library.insert("files",req.body,function(err,result){
			if(result){
		  		res.send("Success")	  	
		  	}
		  	else
		  	{
		  		console.log(err)
		  	}
		});
	}
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
