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

var insert = function(table,data,callback)
{
	con = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "monica@123",
       database: 'nodefinal'
});
	str = "insert into "+table+" (";
	for(ans in data){
		str+= ans + ","
	}
	finalstr= str.slice(0,-1);
	finalstr+=")";

	finalstr+=" values ('";
	for(ans in data){
		finalstr+= data[ans] + "','"
	}
	finalstr1= finalstr.slice(0,-2);
	finalstr1+=")";
	//console.log(finalstr1);

	con.query(finalstr1, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}

   	else{
   		callback(null,result);
   	}
    });
}

module.exports = {
	con : con,select:select,insert:insert
}