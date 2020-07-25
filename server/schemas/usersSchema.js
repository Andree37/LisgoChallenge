'use strict'

const Joi = require('@hapi/joi');

module.exports = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    password: Joi.string().min(3).required(),
    role: Joi.string().valid('normal', 'admin')
});