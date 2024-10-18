const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io/random?tags=technology,inspirational');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ content: "Keep coding, keep growing!" });
  }
});

module.exports = router;
