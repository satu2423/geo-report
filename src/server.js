const express = require('express');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const dbPath = path.resolve(__dirname, '..', 'database.db');
const db = new sqlite3.Database(dbPath);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, '..')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/incidents', (req, res) => {
  db.all('SELECT * FROM incidents', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error reading incidents from database.' });
    }
    res.json(rows);
  });
});

app.post('/report', upload.single('media'), (req, res) => {
  const { description, lat, lng } = req.body;
  const mediaPath = req.file ? '/uploads/' + req.file.filename : null;

  const newIncident = {
    description,
    lat,
    lng,
    mediaPath,
    createdAt: new Date().toISOString()
  };

  const sql = `
    INSERT INTO incidents (description, lat, lng, mediaPath, createdAt)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [newIncident.description, newIncident.lat, newIncident.lng, newIncident.mediaPath, newIncident.createdAt], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error writing incident to database.' });
    }
    res.status(201).json({ message: 'Incident reported successfully!' });
  });
});

app.listen(port, () => {
  console.log(`GeoReport server listening at http://localhost:${port}`);
});
