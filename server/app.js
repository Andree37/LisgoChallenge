'use strict';

const Hapi = require('@hapi/hapi');
const {Model} = require('objection');
const Knex = require('knex');
const hapiAuthJwt2 = require('hapi-auth-jwt2');
const routes = require('./routes/indexRoutes');

const env = require('./envVariables.json')
const jwtStrategy = require('./authentication/strategies/JWT');

// Initialize knex
const knex = Knex({
    client: env.DATABASE_CLIENT,
    useNullAsDefault: true,
    connection: {
        host: env.DATABASE_HOST,
        port: env.DATABASE_PORT,
        database: env.DATABASE_NAME,
        user: env.DATABASE_USER,
        password: env.DATABASE_PASSWORD
    },
    debug: true
});

Model.knex(knex);

const init = async () => {

    const server = Hapi.server({
        port: env.SERVER_PORT,
        host: env.SERVER_HOST,
        debug: {request: ['error']},
        routes: {
            cors: true
        }
    });

    server.route(routes);

    await server.register(hapiAuthJwt2);
    await server.register([require('vision'), require('inert'), require('lout')]);

    server.auth.strategy(jwtStrategy.name, jwtStrategy.schema, jwtStrategy.options);

    server.auth.default(jwtStrategy.name);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();