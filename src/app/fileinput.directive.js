import mainModule from './app.module';

export default mainModule.directive('fileInput', [function fileDir() {
    return {
        scope: true,
        restrict: 'A',
        require: "ngModel",
        link: function postLink(scope, elem, attrs, ngModel) {
          elem.on("change", function(e) {
            const files = elem[0].files;
            // console.log(files);
            // ngModel.$setViewValue(files);
            const reader = new FileReader();
            // console.log(reader);

            reader.onload = function(event) {
                const theUrl = event.target.result;
                console.log(theUrl);
                // $('').html("<img src='" + the_url + "' />");
            }
            let r = reader.readAsDataURL(e.target.files[0]);
            // console.log(r);

          })
        }
      }
}]);