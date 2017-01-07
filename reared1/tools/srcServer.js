'use strict';
import path from 'path';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3003 });

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file(path.join( __dirname, '../src/index.html'));
        }
    });
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});