const BookIssue = require('express').Router();
const {getAllIssuedBook} = require('../controllers/bookissue.controllers')

BookIssue.get('/', getAllIssuedBook);

module.exports = BookIssue;