'use strict'

const Joi = require('@hapi/joi');

module.exports = Joi.object({
    name: Joi.string()
        .required()
        .description("User's name.")
        .example("John"),
    surname: Joi.string()
        .required()
        .description("User's surname.")
        .example("Doe"),
    role: Joi.object({
        type: Joi.string()
            .valid('normal', 'admin')
            .required()
            .description("User's role.")
            .example("normal"),
    })
});