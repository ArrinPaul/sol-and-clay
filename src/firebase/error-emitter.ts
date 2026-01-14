import { EventEmitter } from 'events';
import { FirestorePermissionError } from './errors';

class ErrorEmitter extends EventEmitter {
  emitError(error: FirestorePermissionError) {
    this.emit('error', error);
  }

  onError(callback: (error: FirestorePermissionError) => void) {
    this.on('error', callback);
    return () => this.off('error', callback);
  }
}

export const errorEmitter = new ErrorEmitter();
