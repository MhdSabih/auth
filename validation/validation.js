const Joi = require('@hapi/joi');

const registerValidation = (body) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(body);
}
const loginValidation = (body) => {
    const schema = Joi.object({
        email: Joi.string().min(6).email().regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(body);
}

module.exports = {
    registerValidation,
    loginValidation
};
