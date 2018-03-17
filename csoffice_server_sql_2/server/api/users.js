const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'im running',
    });
});

module.exports = router;
