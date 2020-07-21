'use strict';

const env = require('./envVariables.json')

const Hapi = require('@hapi/hapi');
const {Model} = require('objection');
const Knex = require('knex');
const hapiAuthJwt2 = require('hapi-auth-jwt2');
const routes = require('./config/routes/index');

// Initialize knex.
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

    server.auth.strategy('jwt', 'jwt', {
        key: env.JWT_KEY,
        validate: function (decoded, req, h) {
            return {isValid: true}
        },
        verifyOptions: {
            algorithms: ['HS256']
        }
    });

    server.auth.default('jwt');

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();