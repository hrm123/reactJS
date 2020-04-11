import openSocket from 'socket.io-client';
import Rx from 'rxjs/Rx';
import createSync from 'rxsync';

const port = parseInt(window.location.search.replace('?', ''),10) || 8000;
const socket = openSocket(`http://localhost:${port}`);


function subscribeToDrawings(cb) {
  socket.on('drawing', drawing => cb(drawing));
  socket.emit('subscribeToDrawings');
}

const sync = createSync({
  maxRetries: 10,
  delayBetweenRetries: 1000,
  syncAction: line => new Promise((resolve, reject) => {
    let sent = false;
    socket.emit('publishLine', line, () => {
      sent = true;
      resolve();
    });
    setTimeout(() => {
      if(!sent) {
        reject();
      }
    }, 2000);
  })
})

function subscribeToDrawingLines(drawingId, cb) {
  const lineStream = Rx.Observable.fromEventPattern(
    h => socket.on(`drawingLine:${drawingId}`, h),
    h => socket.off(`drawingLine:${drawingId}`, h),
  );

  const bufferedStream = 
      lineStream
      .bufferTime(100)
      .map(lines => ({ lines }));

  const reconnectStream = Rx.Observable.fromEventPattern(
    h => socket.on('connect', h),
    h => socket.off('connect', h),
  );

  const maxStream = lineStream
    .map(l => new Date(l.timestamp).getTime())
    .scan((a,b) => Math.max(a,b),0);
  
  reconnectStream
    .withLatestFrom(maxStream)
    .subscribe((joined) => {
      const lastReceivedTimeStamp = joined[1];
      debugger;
      socket.emit('subscribeToDrawingLines', {
        drawingId,
        from: lastReceivedTimeStamp
      });
    });

  bufferedStream.subscribe(linesEvent => cb(linesEvent));
  // socket.on(`drawingLine:${drawingId}`, cb);
  socket.emit('subscribeToDrawingLines', { drawingId });
}

function createDrawing(name) {
  socket.emit('createDrawing', { name });
}

sync.failedItems.subscribe(x => console.error('faield line sync', x) );
sync.syncedItems.subscribe(x => console.log('line synced ', x) );

function publishLine({drawingId, line}){
  sync.queue( {drawingId, ...line});
}

function subsribeToConnectionEvent(cb) {
  socket.on('connect', () => cb({
    state: 'connected',
    port,
  }));

  socket.on('disconnect', () => cb({
    state: 'disconnected',
    port,
  }));

  socket.on('connect_error', () => cb({
    state: 'disconnected',
    port,
  }))

}

export {
  createDrawing,
  subscribeToDrawings,
  publishLine,
  subscribeToDrawingLines,
  subsribeToConnectionEvent
};