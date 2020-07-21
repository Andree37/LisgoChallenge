const bcrypt = require('bcrypt');

const saltRounds = 10;

const make = value => (
    bcrypt.hash(value, saltRounds)
)

const compare = (value, valueHashed) => (
    bcrypt.compare(value, valueHashed)
)

module.exports = {
    make,
    compare,
}