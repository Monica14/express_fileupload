//alert("asdasdsa");
angular.module('fileUpload', ['ngFileUpload'])
    .controller('MyCtrl',['Upload','$window',function(Upload,$window){
        var vm = this;
        
       
        vm.submit = function(){ 
            for(var i=0;i<=vm.file.length;i++)
            {
               
                if (vm.file) { 
                    vm.upload(vm.file[i],i); //call upload function
                }
                else{
                    alert("Only .png, .jpg, .jpeg files are allowed")
                }
            }
            
        }
        vm.upload = function (file,cnt) {
            Upload.upload({
                url: 'http://localhost:3011/cart/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data == "Success" && cnt == vm.file.length-1){ //validate success
                    $window.alert('Files Uploaded successfully');
                } 
            });
        };
        vm.del_img = function(f)
        {
            for(var i=0;i<=vm.file.length;i++)
            {
                if(vm.file[i] == f)
                {                    
                    delete vm.file[i];
                    
                }
                if(vm.file[i] !== undefined)
                {
                    vm.file[i] = vm.file[i];
                }
            }
            
        }
    }]);