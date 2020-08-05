
'use strict'

const Joi = require('@hapi/joi');

module.exports = Joi.object({
    statusCode: Joi.number()
        .integer()
        .description("The http status code")
        .example(400),
    error: Joi.string()
        .description("Error name")
        .example("Not Found"),
    message: Joi.string()
        .description("The error message ")
        .example("NO_ACTIVE_SUBSCRIPTION"),
    attributes: Joi.object({
        error: Joi.string()
            .description("The attribute message ")
            .example("NO_ACTIVE_SUBSCRIPTION")
    })
})