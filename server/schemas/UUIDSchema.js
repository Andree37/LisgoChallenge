'use strict'

const Joi = require('@hapi/joi');

module.exports = Joi.object({
    id: Joi.string()
        .guid()
        .required()
        .description("Type Identifier.")
        .example("c15b6a46-5abc-45f6-89cc-01368d12e103")
})