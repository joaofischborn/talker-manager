const verifyTalk = async (req, res, next) => {
    const { talk } = req.body;
    if (talk) {
        return next();
    }
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
};

const verifyWatchedAt = async (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    if (watchedAt) {
        return next();
    }
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
};

const verifyWatchedAtDateFormat = async (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (regex.test(watchedAt)) {
        return next();
    }
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
};

const verifyRate = async (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate) {
        return next();
    }
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
};

const verifyRateInteger = async (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate >= 1 && rate <= 5) {
        return next();
    } 
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
};

module.exports = { verifyTalk, 
    verifyWatchedAt, 
    verifyWatchedAtDateFormat, 
    verifyRate, 
    verifyRateInteger };