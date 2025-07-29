const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

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
  fs.readFile(path.join(__dirname, '..', 'incidents.json'), 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.json([]); // If file doesn't exist, return empty array
      }
      console.error(err);
      return res.status(500).json({ message: 'Error reading incidents file.' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/report', upload.single('media'), (req, res) => {
  const { description, lat, lng } = req.body;
  const mediaPath = req.file ? req.file.path.replace(path.join(__dirname, '..'), '').replace(/\\/g, '/') : null;


  const newIncident = {
    description,
    lat,
    lng,
    mediaPath,
    timestamp: new Date().toISOString()
  };

  const incidentsFilePath = path.join(__dirname, '..', 'incidents.json');

  fs.readFile(incidentsFilePath, 'utf8', (err, data) => {
    let incidents = [];
    if (!err && data) {
      incidents = JSON.parse(data);
    }

    incidents.push(newIncident);

    fs.writeFile(incidentsFilePath, JSON.stringify(incidents, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error writing incidents file.' });
      }

      res.status(201).json({ message: 'Incident reported successfully!' });
    });
  });
});

app.listen(port, () => {
  console.log(`GeoReport server listening at http://localhost:${port}`);
});
