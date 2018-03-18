const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Get Route Here We Are',
  });
})