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
    password: Joi.string()
        .min(3)
        .required()
        .description("User's password.")
        .example("password"),
});