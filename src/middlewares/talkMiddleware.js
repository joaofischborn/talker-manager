const verifyTalk = async (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
};

const verifyWatchedAt = async (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    next();
};

const verifyWatchedAtDateFormat = async (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const verifyRate = async (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    next();
};

const verifyRateInteger = async (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (!rate >= 1 && !rate <= 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    } 
    next();
};

module.exports = { verifyTalk, 
    verifyWatchedAt, 
    verifyWatchedAtDateFormat, 
    verifyRate, 
    verifyRateInteger };