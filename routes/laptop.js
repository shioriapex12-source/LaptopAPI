var express = require('express');
var router = express.Router();
const laptopModel = require('../models/laptop.model');
const jwt = require('jsonwebtoken');

const { findAll, findById, Create } = require('../controllers/laptop.controller');

const authenticationToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        res.status(401).send("Access Denied!");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).send("Access Denied!");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.account = decoded;
        next();
    } catch (err) {
        res.status(401).send("Invalid token!!");
    }
};

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', authenticationToken, Create);

module.exports = router;

//shioriapex12_db_user
//skjok4sOtRynFTT9