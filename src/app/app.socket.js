import io from 'socket.io-client';
import mainModule from './app.module';

export default mainModule
.factory('socket', ['socketFactory', '$location', function Socket(socketFactory, $location) {
    let url;
    const protocol = $location.protocol();
    if (protocol === 'http') {
        url = 'http://localhost:3000';
    } else {
        url = 'https://wondrer-todoapp.herokuapp.com';
    }
    // ////////////////////////////////////////////////
    if (process.env.NODE_ENV === 'production') {
        console.log('Welcome to production');
      } else {
        console.log('Welcome to development');
      }
    //   ////////////////////////////////////////////

    return socketFactory({
        prefix: '',
        ioSocket: io.connect(url)
    });
  }])