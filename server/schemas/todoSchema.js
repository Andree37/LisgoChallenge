'use strict'

const Joi = require('@hapi/joi');

module.exports = Joi.object({
    description: Joi.string(),
    state: Joi.string().valid('COMPLETE', 'INCOMPLETE')
});

