import io from 'socket.io-client';
import mainModule from './app.module';

export default mainModule
.factory('socket', ['socketFactory', function Socket(socketFactory) {
    const url = 'https://wondrer-todoapp.herokuapp.com' || 'http://localhost:3000';
    return socketFactory({
        prefix: '',
        ioSocket: io.connect('http://localhost:3000')
        // ioSocket: io.connect(url)
    });
  }])