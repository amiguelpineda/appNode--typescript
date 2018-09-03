/**
 * Dependecias del Proyecto
 */

//https://nodejs.org/dist/latest-v8.x/docs/api/http.html
import * as http from 'http';

//https://nodejs.org/dist/latest-v8.x/docs/api/net.html
import { AddressInfo } from 'net';

//https://www.npmjs.com/package/debug
const debug: any = require('debug')('appNode:server');

/**
 * Configuraciones Basicas del Servidor
 */

 //https://nodejs.org/en/docs/guides/getting-started-guide/
const hostname: string  = '127.0.0.1';
const port: number = 3000;

/**
 * Se crea la instancia de la clase http.server
 */

//https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_http_createserver_requestlistener
const server: http.Server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hello World');
});

/**
 * Se pone en marcha el servidor
 */

//https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_server_listen
server.listen(port,hostname);

/**
 * Se manejan los eventos en el servidor
 */

//https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
server.on('error',onError);
server.on('listening', onListening);


/**
 * Event listener for HTTP server "error" event.
 */

//https://nodejs.org/dist/latest-v8.x/docs/api/errors.html
 function onError(error:any): void{
    
    if (error.syscall !== 'listen'){
        throw error;
    }

    let bind:any = typeof port === 'string'
        ? 'Pipe' + port
        : 'Port' + port;
    
    switch(error.code){
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break
        default:
            throw error;
    }
 }

//https://nodejs.org/dist/latest-v8.x/docs/api/net.html#net_server_address
 function onListening(): void{
     let addr: string | AddressInfo = server.address();
     let bind = typeof addr ==='string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
 }