import io from 'socket.io-client'
import mainModule from './app.module';

export default mainModule
.factory('socket', [function() {
    const socket = io.connect('http://localhost:3000');

    return {
      on: function(eventName, callback) {
        socket.on(eventName, callback);
      },
      emit: function(eventName, data) {
        socket.emit(eventName, data);
      }
    };
  }]);