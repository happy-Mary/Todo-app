import io from 'socket.io-client';
import mainModule from './app.module';

export default mainModule
.factory('socket', ['socketFactory', '$location', function Socket(socketFactory) {
    let url;
    const applicationENV = process.env.ENV;
    if (applicationENV === 'development') {
        url = 'http://localhost:3000';
    } else if (applicationENV === 'production') {
        url = 'https://wondrer-todoapp.herokuapp.com';
    }

    return socketFactory({
        prefix: '',
        ioSocket: io.connect(url)
    });
  }])