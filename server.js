const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Incident = require('./models/incident');

const app = express();
const port = 3000;

// Connect to MongoDB
const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost/georeport';
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.static('./'));
app.use('/uploads', express.static('uploads'));

app.get('/incidents', async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/report', upload.single('media'), async (req, res) => {
  const { description, lat, lng } = req.body;
  const mediaPath = req.file ? req.file.path : null;

  const incident = new Incident({
    description,
    lat,
    lng,
    mediaPath
  });

  try {
    const newIncident = await incident.save();
    res.status(201).json(newIncident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`GeoReport server listening at http://localhost:${port}`);
});
