const { Router } = require('express');
const { getTypesHandler } = require('../handlers/getTypeHandler');

const typeRouter = Router();

typeRouter.get('/', getTypesHandler);

module.exports = typeRouter;