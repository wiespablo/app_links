const express = require('express');
const router = express.Router();

router.get('/notes', (req, res) => {
    res.send('Links');
} )

const pool = require('../database');
//cuando el navegador pida petición GET
router.get('/add', (req, res) => {
    res.render('links/add');
})
module.exports = router;