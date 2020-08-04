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
    state: Joi.string()
        .valid('COMPLETE', 'INCOMPLETE')
        .required().
        description("State of the todo"),
    description: Joi.string()
        .required()
        .description("Description of the todo"),
    date_added: Joi.date()
        .required()
        .description("Date it started.")
        .example("2018-07-18T13:33:48.748Z"),
    creator: Joi.object({
        id: Joi.string()
            .guid()
            .required()
            .description("Log Identifier of the creator of this todo.")
            .example("c15b6a46-5abc-45f6-89cc-01368d12e103"),
        name: Joi.string()
            .required()
            .description("Name of creator of the todo"),
        surname: Joi.string()
            .required()
            .description("Surname of the creator of the todo")
    })
});

