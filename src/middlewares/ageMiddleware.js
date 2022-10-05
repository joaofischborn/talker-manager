const verifyAge = async (req, res, next) => {
    const { age } = req.body;
    if (age) {
    return next();
    } 
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
};

const verifyAgeEighteen = async (req, res, next) => {
    const { age } = req.body;
    if (Number.isInteger(age) && age >= 18) {
    return next();
    } 
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  };

module.exports = { verifyAge, verifyAgeEighteen };