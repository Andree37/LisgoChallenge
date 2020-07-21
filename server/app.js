'use strict';

const Hapi = require('@hapi/hapi');
const {Model} = require('objection');
const Knex = require('knex');
const routes = require('./config/routes/index');

// Initialize knex.
const knex = Knex({
    client: 'pg',
    useNullAsDefault: true,
    connection: {
        host: '34.89.15.13',
        port: '5432',
        database: 'andrechallenge',
        user: 'a_ribeiro',
        password: 'A-d#32d.DsD!daEEdLc333536dsadEdsa'
    },
    debug: true
});

Model.knex(knex);

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        debug: { request: ['error'] },
        routes: {
            cors: true
        }
    });

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();