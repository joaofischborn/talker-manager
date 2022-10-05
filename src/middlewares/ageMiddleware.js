const verifyAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    next();
};

const verifyAgeEighteen = (req, res, next) => {
    const { age } = req.body;
    if (!Number.isInteger(age) && age >= 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    } 
    next();
  };

module.exports = { verifyAge, verifyAgeEighteen };