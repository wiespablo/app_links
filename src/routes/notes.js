const express = require('express');
const router = express.Router();

router.get('/notes', (req, res) => {
    res.send('Notas para la base de datos');
} )

module.exports = router;