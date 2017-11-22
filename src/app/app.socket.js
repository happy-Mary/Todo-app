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
    const applicationENV = process.env.ENV;
    console.log(applicationENV);
    // production, development
    //   ////////////////////////////////////////////

    return socketFactory({
        prefix: '',
        ioSocket: io.connect(url)
    });
  }])