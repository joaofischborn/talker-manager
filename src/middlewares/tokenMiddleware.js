const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        return next();
    } 
    return res.status(401).json({ message: 'Token não encontrado' });
};

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization.length === 16) {
        return next();
    }
    return res.status(401).json({ message: 'Token inválido' });
};

module.exports = { validateToken, verifyToken };