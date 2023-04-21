const { getTypes } = require('../controllers/typeController');
const { Type } = require('../db');

const getTypesHandler = async (req, res) => {
    try {
        const apiTypes = await getTypes();
        console.log(apiTypes);

        for (let i = 0; i < apiTypes.length; i++) {
        const type = apiTypes[i];
        const existingType = await Type.findOne({
            where: { name: type.name },
        });

        if (!existingType) {
            await Type.create(type);
        }
        }

        const allTypes = await Type.findAll({
        order: [["name", "ASC"]],
        });

        res.status(200).json(allTypes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getTypesHandler
};