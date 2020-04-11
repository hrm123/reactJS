import openSocket from 'socket.io-client';
import Rx from 'rxjs/Rx';

const socket = openSocket('http://localhost:8000');


function subscribeToDrawings(cb) {
  socket.on('drawing', drawing => cb(drawing));
  socket.emit('subscribeToDrawings');
}

function subscribeToDrawingLines(drawingId, cb) {
  const lineStream = Rx.Observable.fromEventPattern(
    h => socket.on(`drawingLine:${drawingId}`, h),
    h => socket.off(`drawingLine:${drawingId}`, h),
  );

  const bufferedStream = 
      lineStream
      .bufferTime(100)
      .map(lines => ({ lines }));

      bufferedStream.subscribe(linesEvent => cb(linesEvent));
  // socket.on(`drawingLine:${drawingId}`, cb);
  socket.emit('subscribeToDrawingLines', drawingId);
}

function createDrawing(name) {
  socket.emit('createDrawing', { name });
}

function publishLine({drawingId, line}){
  socket.emit('publishLine', {drawingId, ...line});
}

export {
  createDrawing,
  subscribeToDrawings,
  publishLine,
  subscribeToDrawingLines
};