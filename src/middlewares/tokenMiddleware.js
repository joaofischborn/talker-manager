const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
    next();
    } 
    res.status(401).json({ message: 'Token não encontrado' });
};

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization.length === 16) {
    next();
    }
    res.status(401).json({ message: 'Token inválido' });
};

module.exports = { validateToken, verifyToken };