import mainModule from './app.module';

export default mainModule
    .service('localStorageService', ['$timeout', '$http', function localStorageService($timeout, $http) {

        function getData(url) {
            const currUrl = url;
            return $http({ method: 'GET', url: currUrl });
        }

        function setData(url, data) {
            const currUrl = url;
            return $http({ method: 'POST',
            url: currUrl,
            uploadEventHandlers: {
                    // progress: function (e) {
                    //         if (e.lengthComputable) {
                    //             // let progressBar = (e.loaded / e.total) * 100;
                    //             console.log(e.loaded);
                    //         }
                    // }
                },
            data: angular.toJson(data)
        });
        }

        function deleteData(url, id) {
            const currUrl = `${url}/${id}`;
            return $http({ method: 'DELETE', url: currUrl });
        }

        function updateData(url, id, data) {
            const currUrl = `${url}/${id}`;
            return $http({ method: 'PUT', url: currUrl, data: angular.toJson(data) });
        }

        function getDataFiltered(url, id) {
            const currUrl = `${url}/${id}`;
            return $http({ method: 'GET', url: currUrl });
        }

        function setFiles(url, fileData) {
            const currUrl = url;
            return $http({
                method: 'POST',
                url: currUrl,
                data: fileData,
                headers: { 'Content-Type': undefined }
            });
        }

        return {
            get: getData,
            getFiltered: getDataFiltered,
            set: setData,
            delete: deleteData,
            update: updateData,
            postFiles: setFiles
        };
    }]);
