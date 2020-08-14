'use strict';

const todoHandler = require('../handlers/todoHandler')
const todoSchema = require('../schemas/todoSchema');
const UUIDSchema = require('../schemas/UUIDSchema');
const errorSchema = require('../schemas/errorSchema');

const Joi = require('@hapi/joi');

module.exports = [
    {
        method: 'PUT',
        path: '/todos',
        handler: todoHandler.create,
        options: {
            validate: {
                payload: Joi.object({
                    description: Joi.string()
                        .required()
                        .description("Description of the todo")
                })
            },
            response: {
                status: {
                    201: todoSchema,
                    400: errorSchema,
                    401: errorSchema
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/todos',
        handler: todoHandler.get,
        options: {
            validate: {
                query: Joi.object({
                    filter: Joi.string()
                        .valid('ALL', 'COMPLETE', 'INCOMPLETE')
                        .description('What to filter on DB call'),
                    orderBy: Joi.string()
                        .valid('DESCRIPTION', 'DATE_ADDED')
                        .description('What to filter on DB call')
                })
            },
            response: {
                status: {
                    200: Joi.array().items(todoSchema),
                    400: errorSchema,
                    401: errorSchema
                }
            }
        }
    },
    {
        method: 'PATCH',
        path: '/todos/{id}',
        handler: todoHandler.edit,
        options: {
            validate: {
                payload: Joi.object({
                    description: Joi.string()
                        .description("Description of the todo"),
                    state: Joi.string()
                        .valid('COMPLETE', 'INCOMPLETE')
                        .description("State of the todo")
                }),
                params: UUIDSchema
            },
            response: {
                status: {
                    200: todoSchema,
                    400: errorSchema,
                    401: errorSchema,
                    404: errorSchema
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/todos/{id}',
        handler: todoHandler.remove,
        options: {
            validate: {
                params: UUIDSchema
            },
            response: {
                status: {
                    400: errorSchema,
                    401: errorSchema,
                    404: errorSchema
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/todos/all',
        handler: todoHandler.getAll,
        options: {
            response: {
                status: {
                    200: Joi.array().items(todoSchema),
                    401: errorSchema
                }
            }
        }
    },
];