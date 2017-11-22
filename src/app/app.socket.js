import io from 'socket.io-client';
import mainModule from './app.module';

export default mainModule
.factory('socket', ['socketFactory', '$location', function Socket(socketFactory, $location) {
    const url = 'https://wondrer-todoapp.herokuapp.com' || 'http://localhost:3000';
    console.log($location.protocol());
    console.log($location.host());
    return socketFactory({
        prefix: '',
        ioSocket: io.connect('http://localhost:3000')
        // ioSocket: io.connect(url)
    });
  }])