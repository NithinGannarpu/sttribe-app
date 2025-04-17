const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

mongoose.connect(
  'mongodb+srv://akshaymww:PE2YYynnqxZhW5qK@chatbotcluster.tavncb1.mongodb.net/events?retryWrites=true&w=majority&appName=ChatBotCluster',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  location: String,
  category: String,
  available_slots: Number,
  organizer: {
    name: String,
    contact: String
  },
  registration_link: String,
  availableSeats: Number
});

const Event = mongoose.model('Event', eventSchema, 'events');

app.get('/api/events', async (req, res) => {
  try {
    const data = await Event.find().limit(10);
    console.log('📦 Data fetched:', data);
    res.json(data);
  } catch (err) {
    console.error('❌ Failed to fetch events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
