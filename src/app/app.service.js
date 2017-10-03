import mainModule from './app.module';

export default mainModule
    .service('localStorageService', ['$timeout', function localStorageService($timeout) {
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

        return {
            get: getData,
            set: setData
        };
    }]);
