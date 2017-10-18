import mainModule from './app.module';

export default mainModule.directive('fileInput', [function fileDir() {
    return {
        scope: {
            handleFile: '&'
        },
        restrict: 'A',
        link: function postLink(scope, elem, attrs) {
            elem.on("change", (e) => {
                const files = elem[0].files;
                const filesArr = [];

                angular.forEach(files, (file) => {
                    const name = file.name;
                    const size = file.size;
                    const date = file.lastModifiedDate;
                    // console.log(name);
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (event) => {
                            console.log(date);
                            const theUrl = event.target.result;
                            console.log(theUrl);
                            filesArr.push(theUrl);
                            console.log(filesArr);
                        }
                        // reader.readAsDataURL(file);
                })

            })
        }
    }
}]);


/* <script>
    if (typeof Promise !== "function")
        document.write('<script src="//cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.min.js"><\/script>');
</script> */