#!/usr/bin/env node

/**
 * Module dependencies.
 */
import '@babel/polyfill';
import debugRenderer from 'debug';
import http from 'http';
import open from 'open';
import browserSync from 'browser-sync';
import app from '../app';
import {PORT, NODE_ENV} from '../config';

const debug = debugRenderer('node-hue-prstbt:server');

class Server {
  constructor() {
    // Get port from environment and store in Express.
    this.port = this.normalizePort(PORT || '3000');

    // Create HTTP server.
    this.server = http.createServer(app);

    // Listen on provided port, on all network interfaces.
    this.server.listen(this.port);
    this.server.on('error', this.onError.bind(this));
    this.server.on('listening', this.onListening.bind(this));
  }

  /**
   * Normalize a port into a number, string, or false.
   */
  normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  };

  /**
   * Event listener for HTTP server "error" event.
   */
  onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof this.port === 'string'
        ? 'Pipe ' + this.port
        : 'Port ' + this.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  /**
   * Event listener for HTTP server "listening" event.
   */
  async onListening() {
    const addr = this.server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    if(NODE_ENV === 'development') {
      const bs = browserSync.create();
      const browserSyncReuseTab = require('browser-sync-reuse-tab')(bs);
      bs.init({
        files: ['./src/scss/**/*.scss', './src/views/**/*.pug', './src/**/*.js'],
        open: false,
        port: 3000,
        proxy: 'localhost:' + this.port,
        ignore: ['node_modules'],
        reloadDelay: 10,
        reloadOnRestart: true,
        logConnections: true,
        logPrefix: 'node-hue-prstbt',
        logLevel: 'debug'
      }, browserSyncReuseTab);

    }
  };
}

new Server();
