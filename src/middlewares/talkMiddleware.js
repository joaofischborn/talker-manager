const verifyTalk = (req, res, next) => {
    const { talk } = req.body;
    if (talk) {
    next();
    }
    res.status(400).json({ message: 'O campo "talk" é obrigatório' });
};

const verifyWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    if (watchedAt) {
    next();
    }
    res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
};

const verifyWatchedAtDateFormat = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (regex.test(watchedAt)) {
    next();
    }
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
};

const verifyRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate) {
    next();
    }
    res.status(400).json({ message: 'O campo "rate" é obrigatório' });
};

const verifyRateInteger = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate >= 1 && rate <= 5) {
    next();
    } 
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
};

module.exports = { verifyTalk, 
    verifyWatchedAt, 
    verifyWatchedAtDateFormat, 
    verifyRate, 
    verifyRateInteger };