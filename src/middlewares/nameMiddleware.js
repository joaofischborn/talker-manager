const verifyName = async (req, res, next) => {
    const { name } = req.body;
    if (name) {
    return next();
    } 
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
};

const verifyNameLength = async (req, res, next) => {
    const { name } = req.body;
    if (name.length >= 3) {
        return next();
    }
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
};

module.exports = { verifyName, verifyNameLength };