const express = require('express');
const router = express.Router();
const db = require('../data/db');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const geoip = require('geoip-lite');

router.post('/shorturls', (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || !/^https?:\/\/.+/.test(url)) return res.status(400).json({ error: 'Invalid URL' });

  const code = shortcode || uuidv4().slice(0, 6);
  if (db.urls[code]) return res.status(409).json({ error: 'Shortcode already exists' });

  const createdAt = moment();
  const expiry = moment().add(validity, 'minutes');

  db.urls[code] = {
    url,
    createdAt,
    expiry,
    clicks: 0,
    logs: []
  };

  return res.status(201).json({
    shortLink: `http://localhost:3001/${code}`,
    expiry: expiry.toISOString()
  });
});

router.get('/:code', (req, res) => {
  const { code } = req.params;
  const record = db.urls[code];
  if (!record) return res.status(404).json({ error: 'Shortcode not found' });
  if (moment().isAfter(record.expiry)) return res.status(410).json({ error: 'Link expired' });

  const geo = geoip.lookup(req.ip) || {};
  record.clicks++;
  record.logs.push({
    timestamp: new Date().toISOString(),
    referrer: req.get('Referer') || 'direct',
    location: `${geo.city || 'Unknown'}, ${geo.country || 'Unknown'}`
  });

  return res.redirect(record.url);
});

router.get('/shorturls/:code', (req, res) => {
  const { code } = req.params;
  const record = db.urls[code];
  if (!record) return res.status(404).json({ error: 'Shortcode not found' });

  return res.json({
    url: record.url,
    createdAt: record.createdAt.toISOString(),
    expiry: record.expiry.toISOString(),
    clicks: record.clicks,
    clickDetails: record.logs
  });
});

module.exports = router;
