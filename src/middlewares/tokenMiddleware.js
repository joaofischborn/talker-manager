const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
    } 
    next();
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};

module.exports = { validateToken, verifyToken };