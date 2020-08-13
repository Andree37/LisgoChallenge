'use strict'

const Joi = require('@hapi/joi');

module.exports = Joi.object({
    id: Joi.string()
        .guid()
        .required()
        .description("Log Identifier.")
        .example("c15b6a46-5abc-45f6-89cc-01368d12e103"),
    s_id: Joi.number()
        .required()
        .description("Serial Identifier.")
        .example("1"),
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