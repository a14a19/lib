const LibraryRoutes = require('express').Router();
const { getAllData, bulkInsert } = require('../controllers/library.controllers');
const { libraryValidation } = require('../validators/library.validators');

LibraryRoutes.get('/', getAllData)
LibraryRoutes.post('/', libraryValidation, bulkInsert)

module.exports = LibraryRoutes;