var mysql = require('mysql');
// var base_url = window.location.origin;

con = mysql.createConnection({
	     host: "localhost",
	     user: "root",
	     password: "p@$$w0Rd1",
	     database: 'nodefinal'
});

var select = function(fields,table,condition,callback)
{
	
	querystr = "select "+fields+"  from "+table+" where "+condition;
	// console.log(query)
	con.query(querystr, function (err,     result) {
	   	if(err){
	   		callback(err,null);
			
	   	}

	   	else{
	   		callback(null,result);
	   	}
    });
}

module.exports = {
	con : con,select:select
}