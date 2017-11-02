import mainModule from './app.module';

export default mainModule
    .service('localStorageService', ['$timeout', '$http', function localStorageService($timeout, $http) {

        function getData(url) {
            const currUrl = url;
            return $http({ method: 'GET', url: currUrl });
        }

        function setData(url, data) {
            const currUrl = url;
            return $http({ method: 'POST', url: currUrl, data: angular.toJson(data) });
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

        // ? как получать сабтаски и файлы, они будут возвращаться по parentId
        return {
            get: getData,
            getFiltered: getDataFiltered,
            set: setData,
            delete: deleteData,
            update: updateData
        };
    }]);
