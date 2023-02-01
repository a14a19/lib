const { check, validationResult, query } = require('express-validator');

const libraryValidation = async (req, res, next) => {

    await check('libraryList', 'Library list is required').exists().run(req);
    await check('libraryList', 'Library list should be an array').isArray().run(req);

    await check('libraryList.*.name', 'Name is required').exists().trim().run(req);
    await check('libraryList.*.name', 'Name should be a string').isString().run(req);

    await check('libraryList.*.volume', 'Email is required').optional().trim().run(req);
    await check('libraryList.*.volume', 'Email should be a string').isString().run(req);

    await check('libraryList.*.author', 'Author is required').exists().trim().run(req);
    await check('libraryList.*.author', 'Author should be a string only').isString().run(req);

    await check('libraryList.*.category', 'Category is required').exists().trim().run(req);
    await check('libraryList.*.category', 'Category should be string').isString().run(req);

    await check('libraryList.*.publishYear', 'Publish year is required').optional().trim().run(req);
    await check('libraryList.*.publishYear', 'Publish year must be a number').isNumeric().run(req);
    
    await check('libraryList.*.price', 'Price is required').optional().trim().run(req);
    await check('libraryList.*.price', 'Price must be a number').isNumeric().run(req);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() })
    } else {
        next();
    }
}

module.exports = {
    libraryValidation
}