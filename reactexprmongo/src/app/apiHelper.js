import openSocket from 'socket.io-client';
import Rx from 'rxjs/Rx';

const port = parseInt(window.location.search.replace('?', ''),10) || 7775;
const socket = openSocket(`http://localhost:${port}`);


  function subscribeToUserAuthStatus(onStatusChange){
    const authStatusStream = Rx.Observable.fromEventPattern(
        h => socket.on(`authStatusChange`, h),
        h => socket.off(`authStatusChange`, h),
      );

    authStatusStream.subscribe( authStatus => onStatusChange(authStatus))
  }

  export {
    subscribeToUserAuthStatus
  }