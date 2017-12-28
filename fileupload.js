//alert("asdasdsa");
angular.module('fileUpload', ['ngFileUpload'])
    .controller('MyCtrl',['Upload','$window',function($scope,Upload,$window){
        var vm = this;
        //$scope.files_save = files;
        // foreach(files as vm.file) {
        //     console.log(files)
        // }
       
        vm.submit = function(){ //function to call on form submit
            //alert("dfdsfd")
            //console.log(console.log(vm.upload_form.file.$valid))
            for(var i=0;i<=vm.file.length;i++)
            {
                //console.log(vm.upload_form.file)
                // if (vm.upload_form.file[i].$valid && vm.file[i]) { //check if from is valid
                //     vm.upload(vm.file[i]); //call upload function
                // }
                // else{
                //     alert("Only .png, .jpg, .jpeg files are allowed")
                // }
                if (vm.file[i]) { //check if from is valid
                    console.log("asdsa")
                    console.log(vm.file[i])
                    vm.upload(vm.file[i]); //call upload function
                }
                else{
                    alert("Only .png, .jpg, .jpeg files are allowed")
                }
            }
            
        }
        vm.upload = function (file) {
            Upload.upload({
                url: 'http://localhost:3011/cart/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    $window.alert('an error occured');
                }
            });
        };
        vm.del_img = function(f)
        {
            console.log(f)
            angular.element("#"+f).val(null);
        }
    }]);