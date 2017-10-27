import mainModule from './app.module';

export default mainModule
    .service('localStorageService', ['$timeout', function localStorageService($timeout, $http) {
        function setData(key, data) {
            const promise = new Promise((resolve) => {
                $timeout(() => {
                    // localStorage.setItem(key, JSON.stringify(data));
                    localStorage.setItem(key, angular.toJson(data));
                    resolve();
                }, 1000);
            });
            return promise;
        }

        function getData(key) {
            const promise = new Promise((resolve, reject) => {
                $timeout(() => {
                    // const result = JSON.parse(localStorage.getItem(key));
                    const result = angular.fromJson(localStorage.getItem(key));
                    if (result) {
                        resolve(result);
                    } else {
                        reject('Error');
                    }

                }, 1000);
            });
            return promise;
        }

        // //////////////////////////////////////////////////////////
        // function getData(url) {
        //     const currUrl = url;
        //     $http({ method: 'GET', url: currUrl }).then()
        // }

        // function setData(url, data) {
        //     const currUrl = url;
        //     $http({ method: 'POST', url: currUrl, data: angular.toJson(data) }).then()
        // }

        // function deleteData(url) {
        //     // в сервисе, из которого вызываем метод, url = `${constUrl}/${elementId}`
        //     const currUrl = url;
        //     $http({ method: 'DELETE', url: currUrl }).then()
        // }

        // function updateData(url, data) {
        //     // в сервисе, из которого вызываем метод, url = `${constUrl}/${elementId}`
        //     const currUrl = url;
        //     $http({ method: 'UPDATE', url: currUrl, data: angular.toJson(data) }).then()
        // }

        // ? как получать сабтаски и файлы, они будут возвращаться по parentId

        return {
            get: getData,
            set: setData
            // delete: deleteData,
            // update: updateData
        };
    }]);
