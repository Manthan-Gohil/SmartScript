const express = require('express');
const router = express.Router();
const { generateArticle, optimizeArticle } = require('../services/googleAI');

router.post('/generate', async (req, res) => {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }
      const article = await generateArticle(title);
      res.json({ article });
    } catch (error) {
      res.status(500).json({ error: 'Error generating article' });
    }
  });
  
  router.post('/optimize', async (req, res) => {
    const { title, content } = req.body;
  
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
  
    try {
      const optimizedArticle = await optimizeArticle(title, content);
      res.json({ optimizedArticle });
    } catch (error) {
      console.error('Error optimizing article:', error);
      res.status(500).json({ error: 'Error optimizing article' });
    }
  });

module.exports = router;