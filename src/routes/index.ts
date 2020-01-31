import express from 'express';
import path from 'path';

const router = express.Router();

/**
 * Handles any requests that don't match the other routes.
 * Needed to make React Route work properly
 **/
router.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

export default router;
