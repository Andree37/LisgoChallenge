'use strict'

const Joi = require('@hapi/joi');

module.exports = Joi.object({
    description: Joi.string().required(),
    state: Joi.string().valid('COMPLETE', 'INCOMPLETE')
});

