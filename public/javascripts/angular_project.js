app_name = angular.module('eshoper',[]);
base_path = window.location.origin+'/';
app_name.run(function($rootScope){
$rootScope.lable = Array('category','Brand');
})


app_name.service('filterdata',function($rootScope)
{
	this.getid = function(id,type)
	{
		//alert(type+"="+id)
		$rootScope.$broadcast('fildata',{a:id,b:type})
	}

})
//alert(base_path)
app_name.controller('brand',function($scope,$http,filterdata){
	$http.get(base_path+'brand').then(function(res){
		// console.log(res.data)
		$scope.resultarr = res.data;
	},function(err){

	})
	$scope.filterbrand = function(id)
	{
		filterdata.getid(id,'br')
	}
})

app_name.controller('category',function($scope,$http,filterdata){
	$http.get(base_path+'category').then(function(res){
		 console.log(res.data)
		$scope.category_data = res.data;
	},function(err){

	})
	$scope.cat_filter = function(id)
	{
		// $rootScope.$broadcast('catdata',id)
		filterdata.getid(id,'cat')
	}
})

app_name.controller('upload_img',function($scope,$http){
	//alert("sadas")
})

app_name.controller('products',function($scope,$http,$rootScope){
	$http.get(base_path+'products').then(function(res){
		 console.log(res.data)
		$scope.products = res.data;
	},function(err){

	})
	$scope.add_prod = function(id)
	{
		if (typeof localStorage == 'object') 
		{
			if (!localStorage.pid) 
			{
				localStorage.pid = id;
			}
			else
			{
				old_id = localStorage.pid;
				localStorage.pid = old_id+','+id
			}
			
		};
		//alert(localStorage.pid)
		data = {
			id_list : localStorage.pid
		}
		$http.post(base_path+'products/add_to_cart',data).then(function(res){
			// alert(res.data)
		});
	}
	$scope.delprod = function(id,e)
	{
		if (typeof localStorage == 'object') 
		{
			
				data = localStorage.pid.split(',');
				pos = data.indexOf(id);
				data.splice(pos,1);
				newdata = data.join(",");
				localStorage.pid = newdata;
			
						
		
			alert(localStorage.pid)
			data = {
				id_list : localStorage.pid
			}
			$http.post(base_path+'products/add_to_cart',data).then(function(res){
				// alert(res.data)
			});
			e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.style.display="none";
		}
	}
	$rootScope.$on('catdata',function(e,r)
	{
		$http.post(base_path+'products/filtercat',{id:r}).then(function(res){
			$scope.products = res.data;
				//alert(res.data)
			});
		//console.log(r)

	})
	$rootScope.$on('fildata',function(e,r)
	{
		$http.post(base_path+'products/filtercat1',{id:r.a,type:r.b}).then(function(res){
			$scope.products = res.data;
				//alert(res.data)
			});
		//console.log(r)
		
	})
})

app_name.controller('cart',function($scope,$http){
	$http.get(base_path+'cart/cartpro').then(function(res){
		 console.log(res.data);
		$scope.products = res.data;
	},function(err){

	})	
})

