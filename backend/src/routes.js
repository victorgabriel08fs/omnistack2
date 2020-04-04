const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()

    })
}), SessionController.create);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(1),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        city: Joi.string().required().min(1),
        uf: Joi.string().required().length(2)

    })
}), OngController.create);
routes.get('/ongs', OngController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(1),
        description: Joi.string().required().min(1),
        value: Joi.number().required(),
    })
}), IncidentController.create);
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().min(1)
    })
}),IncidentController.index);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);
module.exports = routes;