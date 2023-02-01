const { check, validationResult } = require('express-validator');

const validationLoginUser = async (req, res, next) => {
    await check('email', 'Please enter email.').exists().trim().run(req);
    await check('password', 'Please enter password.').exists().trim().run(req);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).send({ error: errors.array() })
    } else {
        next ();
    }
}

module.exports = {
    validationLoginUser
}