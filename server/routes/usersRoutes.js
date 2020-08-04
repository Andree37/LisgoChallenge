'use strict';

const usersHandler = require('../handlers/usersHandler');
const usersSchema = require('../schemas/usersSchema');
const errorSchema = require('../schemas/errorSchema');

const Joi = require('@hapi/joi');

module.exports = [
    {
        method: 'PUT',
        path: '/users',
        handler: usersHandler.create,
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string()
                        .required()
                        .description("User's name.")
                        .example("John"),
                    surname: Joi.string()
                        .required()
                        .description("User's surname.")
                        .example("Doe"),
                    role: Joi.string()
                            .valid('normal', 'admin')
                            .required()
                            .description("User's role.")
                            .example("normal"),
                    password: Joi.string()
                        .min(3)
                        .required()
                        .description("User's password.")
                        .example("password")
                    }),
            },
            response: {
                status: {
                    200: usersSchema,
                    400: errorSchema,
                    401: errorSchema
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: usersHandler.get,
        options: {
            response: {
                status: {
                    200: Joi.array().items(usersSchema),
                    401: errorSchema
                }
            }
        }
    }
]