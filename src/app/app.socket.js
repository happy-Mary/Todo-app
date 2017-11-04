import io from 'socket.io-client';
import mainModule from './app.module';

export default mainModule

    .factory('socket', function($rootScope) {
    const socket = io.connect('http://localhost:3000');
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                const args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                const args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

// .factory('socket', [function() {
//     const socket = io.connect('http://localhost:3000');

//     return {
//         on: function(eventName, callback) {
//             socket.on(eventName, callback);
//         },
//         emit: function(eventName, data) {
//             socket.emit(eventName, data);
//         }
//     };
// }]);