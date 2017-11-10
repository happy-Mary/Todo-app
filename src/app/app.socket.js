import io from 'socket.io-client';
import mainModule from './app.module';

export default mainModule
.factory('socket', ['socketFactory', function Socket(socketFactory) {
    return socketFactory({
        prefix: '',
        ioSocket: io.connect('http://localhost:3000')
    });
  }])